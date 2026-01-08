import React, { useContext, useEffect } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useGlobalContext } from "../../GlobalContext";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

function Idea() {
  const { _ideas: ideas, fetchIdeas } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen  text-neutral-200 pt-24 pb-20">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold
            bg-clip-text text-transparent
            bg-linear-to-r from-cyan-400 to-violet-500
            [text-shadow:0_0_20px_rgba(139,92,246,0.35)]">
            Your Idea Library
          </h1>
          <p className="mt-3 text-neutral-400">
            All your saved ideas, ready to brainstorm 🚀
          </p>
        </div>

        {/* Content */}
        {ideas.length > 0 ? (
          <section className="max-w-6xl mx-auto px-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ideas.map((idea) => (
              <IdeaCard key={idea._id} idea={idea} />
            ))}
          </section>
        ) : (
          <div className="flex justify-center items-center mt-20">
            <div className="text-center bg-neutral-900/5 backdrop-blur-xl
              border border-white/10 rounded-3xl p-10 max-w-md">
              <h2 className="text-xl font-semibold text-white flex items-center justify-center gap-2">
                <i className="ri-folder-warning-fill text-cyan-400 text-2xl" />
                No ideas saved
              </h2>
              <p className="mt-3 text-neutral-400">
                Start exploring and save ideas to see them here.
              </p>
              <button
                onClick={() => navigate("/home")}
                className="mt-6 px-6 py-2 rounded-xl
                  bg-linear-to-r from-cyan-500 to-violet-500
                  text-white font-medium hover:opacity-90 transition">
                ← Go to Home
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

function IdeaCard({ idea }) {
  const navigate = useNavigate();
  const {
    url,
    successMsg,
    ErrMsg,
    fetchIdeas,
    setChatType,
    _ideas: ideas,
    set_Ideas,
    setActiveChatId,
    fetchChats,
    setMessages,
  } = useGlobalContext();

  const InitChat = async () => {
    setChatType(false);
    try {
      const response = await fetch(`${url}/chat/init`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ idea }),
        credentials: "include",
      });

      const parsedResp = await response.json();
      if (!parsedResp.success) return console.error(parsedResp.message);

      setActiveChatId(parsedResp.chat._id);
      setMessages(parsedResp.chat.messages);
      fetchChats();
      navigate("/chat");
    } catch (err) {
      console.error(err);
    }
  };

  const destroyIdea = async () => {
    try {
      const response = await fetch(`${url}/idea/${idea._id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        credentials: "include",
      });

      const parsedResponse = await response.json();
      if (!parsedResponse.success) return ErrMsg(parsedResponse.message);

      if (ideas.length === 1) set_Ideas([]);
      fetchIdeas();
      successMsg(parsedResponse.message);
    } catch {
      ErrMsg("Unable to process your request right now!");
    }
  };

  return (
    <div className="relative rounded-3xl p-[1.5px]
      bg-linear-to-br from-cyan-500/50 to-violet-500/50">

      <div className="rounded-3xl bg-neutral-900/80 backdrop-blur-xl p-6
        flex flex-col h-full">

        {/* Title */}
        <h3 className="text-lg font-semibold text-white mb-3">
          {idea.title}
        </h3>

        {/* Body */}
        <div className="space-y-2 text-sm text-neutral-300 flex-1">
          <p>
            <span className="text-cyan-400 font-medium">Problem:</span>{" "}
            {idea.problem}
          </p>
          <p>
            <span className="text-violet-400 font-medium">Idea:</span>{" "}
            {idea.description}
          </p>
          <p>
            <span className="text-cyan-400 font-medium">Tech Stack:</span>{" "}
            {idea.techStack}
          </p>
        </div>

        {/* Meta */}
        <div className="mt-4 flex justify-between text-xs text-neutral-400">
          <span>⏳ {idea.duration}</span>
          <span>📦 {idea.projectType}</span>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={destroyIdea}
            className="flex flex-1 text-sm items-center gap-2 border justify-center py-2 text-red-600 border-red-600 rounded-xl cursor-pointer "
          >
            <Trash2 size={16} />
            Delete
          </button>

          <button
            className="flex flex-1 text-sm items-center gap-2 border justify-center py-2 rounded-xl text-blue-500 border-blue-500 cursor-pointer bg-blue-500/10"
            onClick={InitChat}
          >
            Brainstorm
          </button>
        </div>
      </div>
    </div>
  );
}

export default Idea;
