# ⚡ Awd Dev - Software Engineer Portfolio & Keystatic CMS

<p align="center">
  <strong>The personal developer portfolio and content management system of I Putu Agus Wahyu Dupayana.</strong>
</p>

<p align="center">
  <a href="https://awd.my.id"><strong>🌐 Live Site (awd.my.id)</strong></a> •
  <a href="https://blog.awd.my.id"><strong>✍️ Tech Blog</strong></a> •
  <a href="README.id.md"><strong>🇮🇩 Baca dalam Bahasa Indonesia</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16_(App_Router)-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Keystatic-Git--Based_CMS-f97316" alt="Keystatic CMS" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Mistral_AI-Chatbot-purple" alt="Mistral AI" />
</p>

---

## 🌐 Language / Bahasa
- **English** (Current)
- [Bahasa Indonesia](README.id.md)

---

## 📖 Table of Contents
1. [Overview](#-overview)
2. [Key Features](#-key-features)
3. [Tech Stack](#-tech-stack)
4. [Prerequisites](#-prerequisites)
5. [Local Development Guide](#-local-development-guide)
6. [GitHub App Setup (Keystatic Production Mode)](#-github-app-setup-keystatic-production-mode)
7. [Environment Variables Reference](#-environment-variables-reference)
8. [Content Directory Structure](#-content-directory-structure)
9. [Available Scripts](#-available-scripts)
10. [Deployment](#-deployment)
11. [License & Credits](#-license--credits)

---

## 🌟 Overview

This repository contains the source code for the personal developer portfolio of **I Putu Agus Wahyu Dupayana** ([awd.my.id](https://awd.my.id)).

The portfolio is built using modern web technologies: **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **TypeScript**, and **Keystatic CMS**. It utilizes a **Git-based CMS architecture**, meaning all content updates made via the admin dashboard are committed directly to GitHub—eliminating the overhead of external databases while keeping data version-controlled and portable.

---

## 🛠️ Key Features

- **🗂️ Keystatic Git-Based CMS (`/keystatic`)**:
  - Visual admin panel to manage Hero profile, About, Skills, Projects, Certifications, Publications, and Social links.
  - In production, commits content directly to GitHub via GitHub App OAuth.
- **🌐 Bilingual Content Support**:
  - Full dual-language toggle (Indonesian & English) across all major sections and project descriptions.
- **🤖 Integrated Mistral AI Chatbot (`/api/chat`)**:
  - Conversational assistant ready to answer questions about skills, experience, and background.
- **📄 Interactive CV & Resume Generator (`/cv`)**:
  - Live curriculum vitae view with dynamic client-side PDF export powered by `html2canvas` and `jspdf`.
- **🔗 Link-in-Bio Hub (`/links`, `/bio`)**:
  - Clean, centralized link page optimized for social media profiles and mobile devices.
- **📊 GitHub Stats & Pinned Repositories Integration**:
  - Dynamically fetches pinned projects, activity statistics, star counts, and repository metrics via the GitHub API.
- **📰 Automated Blog RSS Integration**:
  - Automatically fetches and displays latest articles from [blog.awd.my.id](https://blog.awd.my.id) via RSS feed.
- **🎨 Modern Dark & Light Mode**:
  - Smooth theme switching with persistent user preference using `next-themes`.
- **⚡ SEO & Performance Optimized**:
  - Dynamic `sitemap.ts`, `robots.ts`, Open Graph / Twitter meta cards, and PWA Web Manifest (`manifest.ts`).

---

## 🧰 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **UI Library** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) & [PostCSS](https://postcss.org/) |
| **Content Management** | [Keystatic CMS](https://keystatic.com/) (`@keystatic/core`, `@keystatic/next`) |
| **AI Integration** | [Mistral AI API](https://mistral.ai/) |
| **PDF Generation** | `html2canvas` & `jspdf` |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Markdown Parsing** | `gray-matter`, `remark`, `remark-html` |
| **Theming** | `next-themes` |
| **RSS Parser** | `rss-parser` |

---

## 📌 Prerequisites

Before running the project locally, ensure you have:
- **Node.js**: Version `18.x` or higher (recommended: Node `20+`).
- **Package Manager**: `npm`, `pnpm`, or `yarn`.
- **Git**: Installed and configured.
- *(Optional)* **GitHub Personal Access Token**: For fetching GitHub statistics and pinned repositories without rate-limit issues.
- *(Optional)* **Mistral API Key**: To test the interactive AI chatbot locally.

---

## 💻 Local Development Guide

### 1. Clone the Repository
```bash
git clone https://github.com/putuwahyu29/awd-dev.git
cd awd-dev
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the project root:

```bash
cp env .env.local
```

Or manually configure `.env.local` with the following variables:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RSS_FEED_URL=https://blog.awd.my.id/rss.xml

# GitHub Token (Optional for local testing, scope: read:user, public_repo)
GITHUB_TOKEN=ghp_your_github_token_here

# Mistral AI Chatbot (Optional for local testing)
MISTRAL_API_KEY=your_mistral_api_key_here
MISTRAL_MODEL=mistral-small-latest
```

> **Note:** In local mode (`NODE_ENV=development`), Keystatic runs in **local file-system mode**, saving edits straight into your local files inside the `content/` folder without needing GitHub credentials.

### 4. Run the Development Server
```bash
npm run dev
```

Open your browser and navigate to:
- **Portfolio Website**: [http://localhost:3000](http://localhost:3000)
- **Keystatic CMS Admin**: [http://localhost:3000/keystatic](http://localhost:3000/keystatic)
- **Interactive CV**: [http://localhost:3000/cv](http://localhost:3000/cv)
- **Links Hub**: [http://localhost:3000/links](http://localhost:3000/links)

---

## 🔐 GitHub App Setup (Keystatic Production Mode)

When deploying to production (such as on Vercel), Keystatic requires a **GitHub App** to authenticate authorized users and commit content directly into the `putuwahyu29/awd-dev` repository.

### Steps to create your GitHub App:

1. Go to [GitHub Settings -> Developer Settings -> GitHub Apps -> New GitHub App](https://github.com/settings/apps/new).
2. Configure App details:
   - **GitHub App name**: `Awd Dev Portfolio CMS` *(must be unique across GitHub)*
   - **Homepage URL**: `https://awd.my.id` (or your deployment URL)
   - **Callback URL**: `https://awd.my.id/api/keystatic/github/created-app`
   - **Webhook**: Uncheck / Disable **Active**.
3. Set **Repository Permissions**:
   - **Contents**: `Read & write`
   - **Pull requests**: `Read & write`
4. Create and retrieve secrets:
   - Click **Create GitHub App**.
   - Copy the generated **Client ID**.
   - Click **Generate a new client secret** and copy the Client Secret value.
5. Install the App:
   - Go to **Install App** in the GitHub App sidebar.
   - Install it on your GitHub account (`putuwahyu29`) and grant access specifically to `putuwahyu29/awd-dev`.

---

## 🔑 Environment Variables Reference

Here is the complete reference of environment variables used across local and production environments:

| Variable Name | Environment | Required | Description |
| :--- | :--- | :---: | :--- |
| `NEXT_PUBLIC_SITE_URL` | Local / Prod | **Yes** | Canonical public site URL (e.g., `https://awd.my.id` or `http://localhost:3000`) |
| `RSS_FEED_URL` | Local / Prod | Optional | RSS XML feed URL for blog article feed (e.g., `https://blog.awd.my.id/rss.xml`) |
| `GITHUB_TOKEN` | Local / Prod | Optional | Personal Access Token (`read:user`, `public_repo`) for GitHub stats & pinned repos |
| `MISTRAL_API_KEY` | Local / Prod | Optional | Mistral AI API key for `/api/chat` conversational assistant |
| `MISTRAL_MODEL` | Local / Prod | Optional | Mistral model identifier (defaults to `mistral-small-latest`) |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO` | Production | **Yes** | Target GitHub repository for Keystatic commits (e.g., `putuwahyu29/awd-dev`) |
| `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | Production | **Yes** | The slug / identifier of your registered GitHub App |
| `KEYSTATIC_GITHUB_CLIENT_ID` | Production | **Yes** | Client ID of your GitHub App |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | Production | **Yes** | Client Secret of your GitHub App |
| `KEYSTATIC_SECRET` | Production | **Yes** | Secure random string used to encrypt Keystatic session cookies |

---

## 📁 Content Directory Structure

Keystatic stores structured data inside the `content/` folder in JSON and Markdown formats:

```
awd-dev/
├── content/
│   ├── about.json          # Bio narrative, highlights, and core engineering pillars
│   ├── categories.json     # Project & skill category taxonomy
│   ├── contact.json        # Contact email, physical location, and hiring availability
│   ├── cv.json             # Work experience, education, and credentials for /cv
│   ├── hero.json           # Hero section headlines, badges, metrics, and summary
│   ├── socials.json        # Social media links, handles, and display preferences
│   ├── tech-stack.json     # Categorized technology stack badges
│   ├── certifications/     # Markdown files + frontmatter for certifications
│   ├── projects/           # Markdown files + frontmatter for showcased projects
│   └── publications/       # Markdown files + frontmatter for scientific papers
└── keystatic.config.ts     # Schema definitions & CMS configuration
```

---

## 📜 Available Scripts

Run these scripts using `npm run <script>`:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server at `http://localhost:3000` |
| `npm run build` | Builds the optimized production application |
| `npm run start` | Runs the compiled production server |
| `npm run lint` | Runs ESLint to check for code quality and syntax issues |

---

## 🚀 Deployment

The project is optimized for deployment on [Vercel](https://vercel.com/):

1. Push your repository to GitHub (`putuwahyu29/awd-dev`).
2. Import the project in Vercel.
3. Configure all production environment variables in your Vercel Project Settings (see [Environment Variables Reference](#-environment-variables-reference)).
4. Deploy! Vercel will automatically build the Next.js app and trigger re-deployments on every Git commit.

---

## 📄 License & Credits

- **Author**: [I Putu Agus Wahyu Dupayana](https://awd.my.id)
- **License**: MIT License. Feel free to use this as an inspiration or reference for your own portfolio.
