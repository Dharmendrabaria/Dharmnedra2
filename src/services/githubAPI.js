const GITHUB_BASE = 'https://api.github.com';

/**
 * Fetch public GitHub profile stats
 * @param {string} username
 */
export const fetchGithubStats = async (username) => {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${GITHUB_BASE}/users/${username}`),
      fetch(`${GITHUB_BASE}/users/${username}/repos?per_page=100&sort=updated`),
    ]);

    if (!userRes.ok) throw new Error('GitHub API error');

    const user = await userRes.json();
    const repos = await reposRes.json();

    // Aggregate language stats
    const langMap = {};
    repos.forEach((repo) => {
      if (repo.language) {
        langMap[repo.language] = (langMap[repo.language] || 0) + 1;
      }
    });

    const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);

    const topLanguages = Object.entries(langMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([lang, count]) => ({ lang, count, pct: Math.round((count / repos.length) * 100) }));

    return {
      name: user.name || username,
      avatar: user.avatar_url,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      public_repos: user.public_repos,
      totalStars,
      topLanguages,
    };
  } catch {
    // Return placeholder data if API fails
    return {
      name: 'Dharmendra Baria',
      avatar: 'https://i.pravatar.cc/150?img=60',
      bio: 'Full Stack MERN Developer',
      followers: 120,
      following: 80,
      public_repos: 35,
      totalStars: 142,
      topLanguages: [
        { lang: 'JavaScript', count: 18, pct: 51 },
        { lang: 'TypeScript', count: 8,  pct: 23 },
        { lang: 'CSS',        count: 5,  pct: 14 },
        { lang: 'C++',        count: 3,  pct: 9  },
        { lang: 'HTML',       count: 1,  pct: 3  },
      ],
    };
  }
};
