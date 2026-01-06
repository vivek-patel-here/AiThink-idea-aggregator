const mongoose= require("mongoose") ;
const {Schema} = mongoose;

const MessageSchema = new Schema({
  role: {
    type: String,
    enum: ["user", "bot"],
    required: true,
  },
  message: {
    type: String,
    required: true,
    minLength: 2,
  },
},{timestamps:true,_id:false});

const IdeaSchema = new Schema(
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
     duration: {
      type: String,
      required: true
    },
    projectType: {
      type: String,
      required: true
    },
},{_id:false})

const ChatSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  idea: {
    type: IdeaSchema,
    required: true,
  },
  messages:{
    type:[MessageSchema]
  }
});

const Chat = mongoose.models.Chat|| mongoose.model("Chat",ChatSchema);

module.exports = {Chat};
