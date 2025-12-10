async function fetchTopGitHubRepos(keyword) {
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(
        keyword
      )}&sort=stars&order=desc`,
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );
    const parsedResponse = await response.json();
    const topRepos = parsedResponse.items.slice(0, 8).map((repo) => {
      return {
        name: repo.full_name,
        owner: repo.owner.login,
        link: repo.html_url,
        visibility: repo.visibility,
        watchers: repo.watchers_count,
        stars: repo.stargazers_count,
      };
    });

    return topRepos;
  } catch (err) {
    console.log("Unable to fetch Github Repos. Due to error:\n",err);
    return [];
  }
}





module.exports={fetchTopGitHubRepos} ;