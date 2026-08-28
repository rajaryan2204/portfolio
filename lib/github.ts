/**
 * ===================================================================
 * GITHUB REPOSITORIES INTEGRATION
 * ===================================================================
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

export async function getGitHubRepositories(username: string): Promise<FetchReposResult> {
  try {
    const res = await fetch("/api/github");
    if (res.ok) {
      const data = await res.json();
      if (data?.success && Array.isArray(data.repositories)) {
        return {
          repositories: data.repositories,
          error: null,
          rateLimited: false,
        };
      }
    }
  } catch (err) {
    console.error("Error fetching /api/github:", err);
  }

  return {
    repositories: [],
    error: "Failed to load repositories.",
    rateLimited: false,
  };
}
