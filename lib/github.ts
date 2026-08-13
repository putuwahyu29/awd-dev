export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
  fork: boolean;
}

// Fetch repos sorted by stars via REST API (fallback)
async function getGitHubReposByStars(limit = 6): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      'https://api.github.com/users/putuwahyu29/repos?sort=updated&per_page=30',
      {
        headers: {
          'User-Agent': 'AWD-Portfolio-Web',
          Accept: 'application/vnd.github.v3+json',
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const repos: GitHubRepo[] = await res.json();
    return repos
      .filter((r) => !r.fork)
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count)
          return b.stargazers_count - a.stargazers_count;
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      })
      .slice(0, limit);
  } catch {
    return [];
  }
}

// Fetch pinned repos via GitHub GraphQL API (requires GITHUB_TOKEN)
async function getGitHubPinnedReposGraphQL(limit = 6): Promise<GitHubRepo[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return [];

  const query = `{
    user(login: "putuwahyu29") {
      pinnedItems(first: ${limit}, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            databaseId
            name
            nameWithOwner
            description
            url
            stargazerCount
            primaryLanguage { name }
            updatedAt
            isFork
          }
        }
      }
    }
  }`;

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'AWD-Portfolio-Web',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const { data, errors } = await res.json();
    if (errors || !data?.user?.pinnedItems?.nodes) return [];

    const nodes = data.user.pinnedItems.nodes;
interface GraphQLPinnedNode {
  databaseId: number;
  name: string;
  nameWithOwner: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  primaryLanguage: { name: string } | null;
  updatedAt: string;
  isFork: boolean;
}

    return nodes.map((node: GraphQLPinnedNode) => ({
      id: node.databaseId,
      name: node.name,
      full_name: node.nameWithOwner,
      description: node.description,
      html_url: node.url,
      stargazers_count: node.stargazerCount,
      language: node.primaryLanguage?.name || null,
      updated_at: node.updatedAt,
      fork: node.isFork,
    }));
  } catch (error) {
    console.warn('GitHub GraphQL pinned repos failed:', error);
    return [];
  }
}

// Main export: pinned repos if token available, else sorted by stars
export async function getGitHubRepos(limit = 6): Promise<GitHubRepo[]> {
  try {
    const pinned = await getGitHubPinnedReposGraphQL(limit);
    if (pinned.length > 0) return pinned;
    return await getGitHubReposByStars(limit);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}
