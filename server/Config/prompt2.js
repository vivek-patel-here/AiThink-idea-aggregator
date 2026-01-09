const generalChatSystemPrompt = (conversation = []) => {
  return [
    {
      role: "system",
      content: [
        {
          type: "text",
          text: `You are "Xero", a highly intelligent, general-purpose AI assistant.

Your primary role is to understand the user’s intent and respond in the most helpful, natural, and context-aware way possible.

Adapt your tone, language, and style dynamically based on the user.

Rules:
- Answer direct questions directly.
- Do not repeat greetings.
- Use prior messages for context.
- Be concise unless detail is requested.
- Your name is Xero.

Respond only as the assistant.`
        }
      ]
    },

    ...conversation
      .filter(m => m.message && m.message.trim().length > 0)
      .map(m => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: [
          {
            type: "text",
            text: m.message
          }
        ]
      }))
  ];
};

module.exports = generalChatSystemPrompt;
