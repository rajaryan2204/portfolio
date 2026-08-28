# Minimal Developer Portfolio

A minimal, fast, and typography-focused personal portfolio website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and live **GitHub REST API** integration.

---

## ⚡ Key Highlights

- **Aesthetic**: Minimal, dark (#0a0a0a), typography-centric, spacious, human-coded feel.
- **GitHub Projects Sync**: Directly connected to GitHub REST API. Fetches all public repositories in real-time, displays stars, forks, languages, updated dates, and archived/fork flags.
- **Client-Side Filtering**: Easily filter repositories by language (TypeScript, JavaScript, Python, C++, Other).
- **Single Profile Configuration**: All content (bio, skills, journey, socials, GitHub username) is editable in [`data/profile.ts`](./data/profile.ts).
- **Accessibility & Performance**: Semantic HTML5, accessible keyboard navigation, visible focus indicators, `prefers-reduced-motion` support, fast server and client hydration.
- **Zero Fluff**: No AI gradients, no floating card gimmicks, no fake testimonials, no fake statistics.

---

## 📁 Directory Structure

```text
personal-portfolio/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx      # Minimal sticky navigation bar with mobile drawer
│   │   ├── Hero.tsx        # Typography-focused intro & social links
│   │   ├── About.tsx       # Text-based narrative
│   │   ├── Skills.tsx      # Clean text-based skills (Languages, Web, Tools)
│   │   ├── Projects.tsx    # Live GitHub API repository list & filters
│   │   ├── Journey.tsx     # Clean timeline of milestones & work
│   │   ├── Contact.tsx     # Direct email, socials, and contact form
│   │   └── Footer.tsx      # Minimal footer
│   ├── layout.tsx          # Root layout with Inter font & SEO OpenGraph tags
│   ├── page.tsx            # Main portfolio page
│   ├── not-found.tsx       # Minimal 404 page
│   └── globals.css         # Tailwind base styles & subtle scrollbars
├── data/
│   └── profile.ts          # 👈 Central configuration file for all personal info
├── lib/
│   └── github.ts           # Type-safe GitHub REST API client & date helpers
├── public/
│   └── images/             # Static assets (if needed)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🛠️ How to Customize Your Details

Open [`data/profile.ts`](./data/profile.ts) and edit:

```typescript
export const profile = {
  name: "raj",                               // Shown in navbar
  displayName: "Raj",                        // Display name in headings & SEO
  username: "YOUR_GITHUB_USERNAME",          // 👈 Your GitHub username to fetch real repos!
  email: "your.email@example.com",           // Contact email
  location: "India",

  bio: "Developer interested in software, web technologies, and solving practical problems with code.",

  aboutText: [
    "I'm a developer who enjoys turning ideas into working products...",
    "My focus is on writing maintainable, readable code..."
  ],

  social: {
    github: "https://github.com/YOUR_GITHUB_USERNAME",
    linkedin: "https://linkedin.com/in/YOUR_LINKEDIN",
    instagram: "https://instagram.com/",
    twitter: "https://twitter.com/",
  },

  skills: {
    languages: ["C++", "Python", "JavaScript", "TypeScript"],
    web: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    tools: ["Git", "GitHub", "Linux", "VS Code"]
  },

  journey: [
    {
      year: "2026",
      title: "Full-Stack Development & Open Source",
      description: "Building scalable web applications..."
    }
  ]
};
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Free Deployment (Vercel / Netlify / GitHub)

### Deploying on Vercel (Recommended for Next.js)
1. Push this project to your GitHub account.
2. Go to [Vercel](https://vercel.com) and click **Add New > Project**.
3. Select your repository. Vercel automatically detects Next.js.
4. Click **Deploy**. Your website is live with automatic SSL and continuous deployment on every git push!
