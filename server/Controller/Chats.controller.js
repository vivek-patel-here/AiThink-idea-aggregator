const { Chat } = require("../Models/Chat.Model");



const GetAllChats = async (req, res) => {
    try {
        const { email } = req.user;
        const allChats = await Chat.find({ userEmail: email });
        if (!allChats) return res.status(500).json({ success: false, message: "Unable to get user chats!" });
        if (allChats.length === 0) return res.status(200).json({ success: true, message: "User chats retrieved.", chats: [] });
        const filteredChats = allChats.map((chat, idx) => {
            return { id: chat._id, description: chat.idea?.description, problem: chat.idea?.problem ,title:chat.idea?.title};
        })
        return res.status(200).json({ success: true, message: "User chats retrieved.", chats: filteredChats });
    } catch (err) {
        console.log("Error from getAllChats :\n", err);
        return res.status(500).json({
    success: false,
    message: "Failed to retrieve chats",
  });
    }
}



const ChatInit = async (req, res) => {
    try {
        const { email } = req.user;
        const { idea } = req.body;
        const { problem, techStack, title, description,duration,projectType } = idea;
        const findChat = await Chat.findOne({
            userEmail: email,
            idea: {
                problem, techStack, title, description,duration,projectType
            }
        })
        if (findChat) return res.status(200).json({ success: true, chat: findChat, message: "Chat found." });
        const newChat = new Chat({
            userEmail: email,
            idea: {
                problem, techStack, title, description ,duration,projectType
            },
            messages: [{"role":"bot",message:`I’ve set up a workspace for "${title}".

From what I understand, the core problem is : 

**${problem}**.


The idea is to build ${description}


You’re planning to use **${techStack}** over a **${duration}** timeframe for a **${projectType}** project.


How would you like to move forward? We can break down the architecture, plan features, or start with implementation details.`}]
        })
        const savedChat = await newChat.save();
        return res.status(200).json({ success: true, chat: savedChat, message: "Chat Initialised." });
    }
    catch (err) {
        console.log("Error in Chat_Init\n", err);
        return res.status(500).json({
    success: false,
    message: "Failed to retrieve chats",
  });
    }
}


const GetChat = async (req, res) => {
    try {
        const { id } = req.params;
        const findChat = await Chat.findById(id);
        if (!findChat) return res.status(404).json({ success: false, message: "Chat not found!" });
        return res.status(200).json({ success: true, message: "Chat found.", chat: findChat });
    } catch (err) {
        console.log("Error in getChat" , err);
        return res.status(500).json({
    success: false,
    message: "Failed to retrieve chats",
  });
    }
}

const DeleteChat = async (req, res) => {
    try{
        const { id } = req.params;
        const deletedChat = await Chat.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "Chat deleted." })
    }catch(err){
        console.log("Error in DeleteChat\n",err);
        return res.status(500).json({
    success: false,
    message: "Failed to retrieve chats",
  });
    }
}



module.exports = { ChatInit, GetAllChats, GetChat, DeleteChat };