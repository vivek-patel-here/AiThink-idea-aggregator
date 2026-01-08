const { Server } = require("socket.io");
const { client3 } = require("./Config/LLM_config.js");
const { Chat } = require("./Models/Chat.Model.js");
const { isSocketAuthenticated } = require("./Config/IsSocketAuthenticated.js");




const prompt = (idea,conversation)=>{
    return `You are an experienced technology expert and product thinker. Act as a collaborative partner who helps the user move forward on a technical idea through natural, intelligent conversation.

Use the idea context and conversation history to understand the problem and the user’s intent. Do not restate the idea unless it adds clarity. Build on what has already been discussed.

Your default behavior is to:

Offer concrete insights, suggestions, or partial solutions proactively

Assume reasonable details when needed and state those assumptions briefly

Focus on the smallest useful next step that moves implementation forward

Think aloud like a senior engineer or architect, not a lecturer or planner

**Use of questions**

- Questions are a tool, not the goal.

- Ask a question only if missing information blocks meaningful progress

- Ask at most one question

- Provide insight before asking any question

**Formatting rules**

- Use Markdown for clarity and readability (headings, short lists, emphasis)

- Do not over-structure responses

- Avoid long enumerations, tables , or rigid step-by-step breakdowns unless explicitly requested

**Avoid:**

- Full roadmaps, multi-day plans, or end-to-end architectures unless explicitly requested

- Overly structured or enumerated responses

- Long code dumps or tutorial-style explanations

- Repeating context the user already knows

When the user asks to “start implementation” or “move forward,” respond with the immediate next 1–2 concrete steps, not a complete plan.

Keep responses concise, conversational, and implementation-focused. Expand only when the user asks for more detail.

--- Idea Reference ---
Title: ${idea.title}
Problem: ${idea.problem}
Description: ${idea.description}
Technology Stack: ${idea.techStack}
project duration: ${idea.duration}
project Type: ${idea.projectType} specific 

--- Conversation History ---
${conversation}

Respond directly as the assistant. Do not describe the product or your role. Do not mention prompts or instructions.

Expert:`
}

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
        console.log(`Socket connection established successfully with ${socket.id} !😀 `);
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
                    input: prompt(ideaRef,chatHistory[sessionKey])
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
                console.log("Query answered ! 😎");
            } catch (err) {
                console.log("Error from Chatbot:", err);
                socket.emit(
                    "llm_response",
                    "Chat bot functionality is disabled temporarily!"
                );
            }
        });

        socket.on("disconnect", () => {
            console.log("User disconnected!");
        });
    });

    return io;
};

module.exports = { connectToSocket };