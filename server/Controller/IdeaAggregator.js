const { Idea } = require("../Models/Idea.Model.js");

//function to fetch the relevent repositories from the github
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


// functon to fetch the Reddit Posts.
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

//function to fetch the Top X post usign web scraping
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
    console.log("user prompt received!")

    // Extract the relevant keywords from the user prompt .
    const prompt =`Extract **semantically significant** keywords or key phrases from the following query, considering its **context and intent**, especially if it relates to code or technical concepts. Return them strictly as a JSON array of strings adhering to this schema:
{
  "$id": "KeywordExtractionSchema",
  "type": "array",
  "items": {
    "type": "string"
  },
  "description": "Array containing only the most salient keywords/ phrases relevant to the query content."
}

Query: ${query}

Output strictly as JSON array only. Do not return explanations, greetings, or additional commentary. Ensure generality so the extraction could work for any natural language input or code structures.`

    console.log("keyword extraction started from user prompt ...")


    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.DEEP_SEEK_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-r1-0528-qwen3-8b:free",
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ]
      })
    });

    const parsedResp = await response.json();
    console.log("keyword extracted 😊")


    let keywords;
    try {
      keywords = JSON.parse(parsedResp.choices[0]["message"]["content"]);
    } catch (e) {
      keywords = parsedResp.choices[0]["message"]["content"];
    }
    const allkeyword = keywords.join("+");
    console.log("Keywords are : ", allkeyword)

    //fetching github top rated repos.
    const top_repos = await fetchTopGitHubRepos(allkeyword);
    //fetching top rated reddit post
    const topRedditPost = await fetchTopRedditPost(allkeyword);
    //fetching top rated X-post
    const topXpost = await fetchTopXPost(allkeyword);

    console.log("Resources from github , twitter and reddit fetched successfully !")

    //Actual Idea Fetching 
    const prompt2 = `Given the following user prompt, search keywords, GitHub repositories, Reddit discussions, and social media posts (X), generate 10–12 **unique**, **innovative**, and **practical** hackathon or startup ideas. Prioritize the user prompt and ensure generated ideas directly address its core themes.

**User Prompt**: ${query}

**Keywords**: ${allkeyword}

**GitHub Repositories**: ${top_repos} (Provide inspiration based on these repos)

**Reddit Discussions**: ${topRedditPost} (Use insights from these posts)

**Social Media (X)**: ${topXpost} (Use insights from these posts)

## Constraints and Requirements
1. Projects must work within a 1–2 week time frame for a typical hackathon.
2. Each idea must integrate **at least one diverse tech stack** (frontend, backend, AI/ML, blockchain, IoT, cloud, etc.)
3. One core idea is preferred, but minor variations for redundancy in similar domains can be included if they offer distinct value.
4. Projects should aim to solve **real-world problems**, not just "niche features"

## Expected Output
Return strictly as JSON array of project objects, following this template:

[
  {
    "title": "<Project Name>",
    "description": "<Brief but compelling description of the idea (1–2 sentences) focusing on functionality and UX>",
    "tech_stack": "<Comprehensive tech stack (e.g., 'MERN + Unity', 'React Native + TensorFlow.js', 'Next.js + WebAssembly + cloud')>",
    "problem_solved": "<Specific problem addressed>"
  },
  <...repeat...>
]

## Optimization Criteria
- Each idea should reflect **current technology trends** and showcase **forward thinking**
- Differentiate between projects: each must have a unique angle/touchpoint 
- Include **potential for scalability** and commercial viability where applicable
- Ensure technical feasibility and clarity of implementation

Do not add any explanations, intro text, or finishing comments—only the JSON array.`;

    console.log("Generating Actual real world useful ideas...")

    const result2 = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.DEEP_SEEK_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-r1-0528-qwen3-8b:free",
        "messages": [
          {
            "role": "user",
            "content": prompt2
          }
        ]
      })
    });

    let response2 = await result2.json();
    let ideas;
    try {
      ideas = JSON.parse(response2.choices[0]["message"]["content"]);
    } catch (e) {
      ideas = response2.choices[0]["message"]["content"];
    }
    
    console.log("Ideas generated successfully !")

    return res.status(200).json({
      success: true,
      keywords,
      top_repos,
      topRedditPost,
      topXpost,
      ideas,
    });
  } catch (err) {
    console.error("LLM Error:", err);
    res.status(500).json({
      success: false,
      message: "Unable to process your Request! Try Again.",
      error: err.message,
    });
  }
};

const saveIdeaLogic = async (req, res) => {
  const { problem, techStack, title, description } = req.body;
  const owner = req.user._id;

  const newIdea = new Idea({
    title,
    problem: problem,
    description: description,
    techStack: techStack,
    owner: owner,
  });

  const savedIdea = await newIdea.save();

  if (!savedIdea) {
    return res
      .status(500)
      .json({ success: false, message: "Failed to save the idea." });
  }

  res
    .status(200)
    .json({
      success: true,
      id: savedIdea.id,
      message: "Idea saved successfully.",
    });
}

const fetchIdeas = async (req, res) => {
  const owner = req.user._id;
  const ideas = await Idea.find({ owner });
  if (!ideas || ideas.length === 0) {
    return res.status(404).json({
      success: false,
      ideas: [],
      message: "No ideas found for this user.",
    });
  }

  res.status(200).json({
    success: true,
    ideas: ideas,
  });

}

const destroyIdeaLogic = async (req, res) => {
  const { idea_id } = req.params;
  const deletedReq = await Idea.findByIdAndDelete(idea_id);
  if (!deletedReq) {
    return res.status(500).json({ success: false, message: "Unable to delete .Try again!" })
  }

  res.status(200).json({ success: true, message: "Idea deleted successfully!" })
}

module.exports = { IdeaAggregateLogic, saveIdeaLogic, fetchIdeas, destroyIdeaLogic };
