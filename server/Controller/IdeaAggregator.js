const { GoogleGenerativeAI } = require("@google/generative-ai");

async function fetchTopGitHubRepos(keyword) {
  try {
    const res = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(
        keyword
      )}&sort=stars&order=desc`,
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    );
    const parsedResponse = await res.json();
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
    return [];
  }
}

async function fetchTopRedditPost(keyword) {
  try {
    const res = await fetch(
      `https://www.reddit.com/search.json?q=${encodeURIComponent(
        keyword
      )}&sort=top&t=month`,
      {
        method: "GET",
      }
    );
    const parsedResponse = await res.json();
    const topRedditPost = parsedResponse.data.children
      .slice(0, 8)
      .map((post) => {
        return {
          title: post.data.title,
          author: post.data.author_fullname,
          link: post.data.url,
          bodyContent: post.data.selftext,
        };
      });

    return topRedditPost;
  } catch (err) {
    return [];
  }
}

async function fetchTopXPost(keyword) {
  try {
    const res = await fetch(
      `https://serpapi.com/search.json?q=site:twitter.com+${encodeURIComponent(
        keyword
      )}&api_key=${process.env.SERP_API_KEY}`,
      {
        method: "GET",
      }
    );
    const parsedResponse = await res.json();
    const topXPosts = parsedResponse.organic_results.map((post) => {
      return {
        title: post.title,
        link: post.link,
        displayed_link: post.displayed_link,
        snippet: post.snippet,
        source: post.source,
      };
    });

    return topXPosts;
  } catch (err) {
    return [];
  }
}

const IdeaAggregateLogic = async (req, res) => {
  try {
    const { query } = req.body;

    //Extract Idea .
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Extract the main keywords or key phrases from the following query. 
    Return them strictly as a JSON array of strings. No extra text,no extra comma , no extra backslash and no newline character, no explanation.
    Query: ${query}
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    let keywords;
    try {
      keywords = JSON.parse(responseText);
    } catch (e) {
      keywords = responseText;
    }
    const allkeyword = keywords.join("+");

    //fetching github top rated repos.
    const top_repos = await fetchTopGitHubRepos(allkeyword);
    //fetching top rated reddit post
    const topRedditPost = await fetchTopRedditPost(allkeyword);
    //fetching top rated X-post
    const topXpost = await fetchTopXPost(allkeyword);

    const prompt2 = `Based on following Keywords , github repos , X-posts and reddit posts, generate Unique and innovative idea suitable for hackathons and startups.
    \nKeywords : ${keywords} ,\nGitHub Repos : ${top_repos} ,\nReddit Posts : ${topRedditPost}  ,\nX Posts : ${topXpost}.
    \nReturn them strictly as a JSON array of object and object format should be like [{
    title : "<Project name here>",
    description:"<Project Description>",
    tech_Stack:"<Tech Stack (for eg . MERN , MEAN etc)>",
    problemSolved : "<Problem solved by this Project>"
  },]. No extra text,no extra comma , no extra backslash and no newline character, no explanation.
    `;
    const result2 = await model.generateContent(prompt2);
    let responseText2 = result2.response.text();

    try {
      responseText2 = JSON.parse(responseText2);
    } catch (err) {}

    res.status(200).json({
      success: true,
      keywords,
      top_repos,
      topRedditPost,
      topXpost,
      ideas: responseText2,
    });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to extract keywords using Gemini",
      error: err.message,
    });
  }
};

module.exports = { IdeaAggregateLogic };
