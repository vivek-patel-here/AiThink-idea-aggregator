
const { client1, client2 } = require("../Config/LLM_config.js");

const ExtractWord = async (query) => {

    const response = await client1.responses.create({
        model: "openai/gpt-oss-20b",
        input: `You are a keyword extraction engine.  
Given a user query, extract 3-10 of the most relevant keywords.  
Rules:
- Return only keywords, no explanations.
- Use lowercase.
- Remove stopwords.
- No punctuation.
- Prefer single words; include short phrases only if necessary.
- Do NOT infer meanings beyond the query.

User Query: ${query}

Return keywords as a JSON array: ["keyword1", "keyword2", ...]
**Do NOT include markdown, code fences, or backticks.**
`,
    });
    return response.output_text;
};



const GenerateIdeas = async(topGithubRepos , redditPosts , XPosts , user_query , keywords,duration,projectType)=>{
    const response = await client2.responses.create({
        model:"openai/gpt-oss-20b",
        input:`You are an AI system that generates high-quality ${projectType} ideas.

Using the following inputs:
- **User Prompt**: ${user_query}
- **Keywords**: ${keywords}
- **GitHub Repositories**: ${topGithubRepos}
- **Reddit Discussions**: ${redditPosts}
- **Social Media (X)**: ${XPosts}
- **Duration** : ${duration}
- **ProjectType** : ${projectType}

### Task
Generate **10-12 unique, innovative, and practical hackathon/startup ideas** directly inspired by the user prompt and enriched by insights from the GitHub repos, Reddit posts, and social media posts.

### Requirements
1. Each idea must be **feasible within ${duration}** of development.
2. Every idea must use **at least one diverse tech stack combination** (frontend + backend, or AI/ML, IoT, blockchain, cloud, etc.).
3. Each idea must focus on a **real-world problem** with clear value (avoid hyper-niche or trivial features).
4. Ideas must be **distinct**—no overlapping or repetitive concepts.
5. Incorporate trends, patterns, or inspiration from the provided GitHub, Reddit, and X inputs.
6. Ensure ideas show **scalability** and **practicality**.

### Output Format (strict)
Return **only** a JSON array of objects, each following this exact structure:

[
  {
    "title": "<Project Name>",
    "description": "<Compelling 1-2 sentence summary of the idea's functionality and user experience>",
    "problem_solved": "<Clear, specific problem addressed>",
    "tech_stack": "<Detailed tech stack (e.g., 'Next.js + FastAPI + PostgreSQL + TensorFlow', 'React Native + Firebase + Teachable Machine')>"
  }
]

No explanations, no commentary, no markdown—**only valid JSON**.
**Do NOT include markdown, code fences, or backticks.**`
    });
    return response.output_text;
};


module.exports = {ExtractWord,GenerateIdeas}