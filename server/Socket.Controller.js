const { Server } = require("socket.io");
const { client3 } = require("./Config/LLM_config.js");
const { Chat } = require("./Models/Chat.Model.js");
const { isSocketAuthenticated } = require("./Config/IsSocketAuthenticated.js");
const SystemPrompt = require("./Config/prompt.js");
const generalChatSystemPrompt = require("./Config/prompt2.js");






const connectToSocket = (server) => {
    const chatHistory = {};
    const io = new Server(server, {
        cors: {
            // origin: "https://ai-think-idea-aggregator.vercel.app",
            origin: "http://localhost:5173",
            credentials: true,
        },
    });

    io.use(isSocketAuthenticated);

    io.on("connection", (socket) => {
        let ideaRef = "General Query";

        socket.on("chat_init", async ({ id }) => {
            try{
                const sessionKey = `${socket.user.email}::${id}`;
                const savedChat = await Chat.findById(id);
                ideaRef = savedChat.idea;
                chatHistory[sessionKey] = savedChat.messages;
                console.log("Chat Initialised ! successfully!");
            }catch(err){
                console.error("Error in chat_init:", err);
            }
        });

        socket.on("user_query", async ({ id, query }) => {  //id : ChatId
            try {
                const sessionKey = `${socket.user.email}::${id}`;
                if (!chatHistory[sessionKey]) chatHistory[sessionKey] = [];
                chatHistory[sessionKey].push({
                    role: "user",
                    message: query,
                });
                const gptReponse = await client3.responses.create({
                    model: "openai/gpt-oss-120b",
                    input: SystemPrompt(ideaRef,chatHistory[sessionKey])
                }
                );

                const text = await gptReponse.output_text;

                if (!text || text.length === 0) {
                    return socket.emit(
                        "llm_response",
                        "Sorry, I couldn't understand your query. Please try again."
                    ); 
                }

                chatHistory[sessionKey].push({ role: "bot", message: text });
                let chats = await Chat.findById(id);
                chats.messages.push({ role: "user", message: query });
                chats.messages.push({ role: "bot", message: text });
                await chats.save();
                socket.emit("llm_response",text);
            } catch (err) {
                console.log("Error from Chatbot:", err);
                socket.emit(
                    "llm_response",
                    "Chat bot functionality is disabled temporarily!"
                );
            }
        });

        socket.on("general_query",async({query})=>{
            try {
                const sessionKey = `${socket.user.email}::general`;
                if (!chatHistory[sessionKey]) chatHistory[sessionKey] = [];
                chatHistory[sessionKey].push({
                    role: "user",
                    message: query,
                });
                const gptReponse = await client3.responses.create({
                    model: "openai/gpt-oss-120b",
                    input: generalChatSystemPrompt(chatHistory[sessionKey])
                }
                );

                const text = await gptReponse.output_text;

                if (!text || text.length === 0) {
                    return socket.emit(
                        "general_response",
                        "Sorry, I couldn't understand your query. Please try again."
                    ); 
                }

                chatHistory[sessionKey].push({ role: "bot", message: text });
                socket.emit("general_response",text);
            } catch (err) {
                console.log("Error from general Chatbot:", err);
                socket.emit(
                    "general_response",
                    "Chat bot functionality is disabled temporarily!"
                );
            }
        })

        socket.on("reset_general",()=>{
            const sessionKey = `${socket.user.email}::general`;
            chatHistory[sessionKey] = [];
        })

        socket.on("disconnect", () => {
            console.log("User disconnected!");
        });
    });

    return io;
};

module.exports = { connectToSocket };