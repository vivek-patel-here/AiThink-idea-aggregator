const { Idea } = require("../Models/Idea.Model.js");
const {ExtractWord,GenerateIdeas} = require("./Llm.controller.js");
const {fetchTopGitHubRepos} = require("./FetchGithubPost.Controller.js");
const {fetchTopRedditPost} = require("./FetchRedditPost.controller.js");
const {fetchTopXPost} = require("./FetchTwitterPost.controller.js");

const IdeaAggregateLogic = async (req, res) => {
  try {
    const { query,duration,projectType } = req.body;
    const keywords = await ExtractWord(query);  
    const parsedKeywords = JSON.parse(keywords); 
    const allKeywords = parsedKeywords.join('+');                   //Extracting relevent keyword from user query
    const top_repos = await fetchTopGitHubRepos(query);        //fetching github top rated repos.
    const topRedditPost = await fetchTopRedditPost(allKeywords);     //fetching top rated reddit post
    const topXpost = await fetchTopXPost(allKeywords);               // fetching top rated X-post
    const ideas = await GenerateIdeas(top_repos,topRedditPost,topXpost,query,keywords,duration,projectType);  
    const parsedIdeas = JSON.parse(ideas);     //Actual Idea Fetching 
    return res.status(200).json({
      success: true,
      parsedKeywords,
      top_repos,
      topRedditPost,
      topXpost,
      parsedIdeas,
    });
  } catch (err) {
    console.error("Error:", err);
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
