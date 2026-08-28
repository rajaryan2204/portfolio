/**
 * ===================================================================
 * GITHUB REST API INTEGRATION
 * ===================================================================
 * Fetches real public repositories directly from the GitHub API.
 * Handles rate-limiting, error responses, multi-page pagination, and formatting.
 */

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  formattedDate?: string;
  homepage?: string | null;
}

export interface FetchReposResult {
  repositories: GitHubRepository[];
  error: string | null;
  rateLimited: boolean;
  isPlaceholder?: boolean;
}

/**
 * Format ISO date string to readable format (e.g. "Updated recently", "Updated 3 days ago")
 */
export function formatUpdatedDate(isoDateString: string): string {
  try {
    const date = new Date(isoDateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) return "Updated today";
    if (diffDays <= 7) return `Updated ${diffDays}d ago`;
    if (diffDays <= 30) return `Updated ${Math.floor(diffDays / 7)}w ago`;

    return `Updated ${date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    })}`;
  } catch {
    return "Recently";
  }
}

/**
 * Fetches all public repositories for a given GitHub username.
 * Supports pagination up to all available public repositories.
 */
export async function getGitHubRepositories(
  username: string
): Promise<FetchReposResult> {
  const cleanUsername = username ? username.trim() : "";

  if (
    !cleanUsername ||
    cleanUsername === "GITHUB_USERNAME" ||
    cleanUsername === "YOUR_GITHUB_USERNAME"
  ) {
    return {
      repositories: [],
      error: "Set your GitHub username in data/profile.ts to display your live public repositories.",
      rateLimited: false,
      isPlaceholder: true,
    };
  }

  const allRepos: GitHubRepository[] = [];
  let page = 1;
  const perPage = 100;
  const maxPages = 5; // Safety cap of 500 repositories

  try {
    while (page <= maxPages) {
      const url = `https://api.github.com/users/${encodeURIComponent(
        cleanUsername
      )}/repos?per_page=${perPage}&page=${page}&sort=updated&type=all`;

      const res = await fetch(url, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        // Revalidate cache every 15 minutes
        next: { revalidate: 900 },
      });

      if (res.status === 403) {
        if (allRepos.length > 0) {
          // If we already got some repos on previous pages, return what we have
          break;
        }
        return {
          repositories: [],
          error: "GitHub API rate limit reached. Please check back shortly.",
          rateLimited: true,
        };
      }

      if (res.status === 404) {
        return {
          repositories: [],
          error: `GitHub user "${cleanUsername}" was not found.`,
          rateLimited: false,
        };
      }

      if (!res.ok) {
        if (allRepos.length > 0) break;
        return {
          repositories: [],
          error: `GitHub API error: ${res.statusText} (${res.status})`,
          rateLimited: false,
        };
      }

      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        break;
      }

      const pageRepos: GitHubRepository[] = data.map((repo: {
        id: number;
        name: string;
        full_name: string;
        html_url: string;
        description: string | null;
        language: string | null;
        stargazers_count: number;
        forks_count: number;
        updated_at: string;
        fork: boolean;
        archived: boolean;
        homepage?: string | null;
      }) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        html_url: repo.html_url,
        description: repo.description ? repo.description.trim() : null,
        language: repo.language || null,
        stargazers_count: repo.stargazers_count ?? 0,
        forks_count: repo.forks_count ?? 0,
        updated_at: repo.updated_at,
        formattedDate: formatUpdatedDate(repo.updated_at),
        fork: Boolean(repo.fork),
        archived: Boolean(repo.archived),
        homepage: repo.homepage || null,
      }));

      allRepos.push(...pageRepos);

      if (data.length < perPage) {
        // Last page reached
        break;
      }

      page++;
    }

    // Sort all repositories by updated_at descending
    const sorted = allRepos.sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );

    return {
      repositories: sorted,
      error: null,
      rateLimited: false,
    };
  } catch (err: unknown) {
    const errorMsg =
      err instanceof Error ? err.message : "Failed to fetch GitHub repositories.";
    return {
      repositories: allRepos.length > 0 ? allRepos : [],
      error: allRepos.length > 0 ? null : errorMsg,
      rateLimited: false,
    };
  }
}
