const mongoose = require("mongoose");

const IdeaSchema = new mongoose.Schema(
  {
   title:{
    type:String,
    required: true,
    trim: true,
   },
    problem: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack:{
        type:String,
        required:true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  }
  
);

const Idea = mongoose.model("Idea", IdeaSchema);

module.exports = { Idea };