import React, { useContext, useEffect, useState } from "react";
import "./Idea.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import GlobalContext from "../../GlobalContext";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

function Idea() {
  const { _ideas: ideas, fetchIdeas } = useContext(GlobalContext);
  const navigate = useNavigate();
  useEffect(() => {
    fetchIdeas();
  });
  return (
    <>
      <Navbar />
      <div className="idea">
        <h1 className="idea-heading">Your idea Library</h1>
        {ideas.length > 0 ? (
          <div className="idea-content">
            {ideas.length > 0 &&
              ideas.map((idea) => {
                return <IdeaCard idea={idea} key={idea._id} />;
              })}
          </div>
        ) : (
          <div className="no-idea">
            <div>
              <h1>
                <i className="ri-folder-warning-fill"></i> You haven't saved any
                ideas yet.
              </h1>
              <p>
                Start exploring and add your favorite ideas to see them here.
              </p>
              <button className="back-btn" onClick={() => navigate("/home")}>
                &larr; Go to home
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

function IdeaCard({ idea }) {
  const navigate = useNavigate();
  const { url, successMsg, ErrMsg, fetchIdeas,chatType,setChatType, _ideas: ideas, set_Ideas , setActiveChatId,fetchChats ,setMessages} = useContext(GlobalContext);

  const InitChat = async () => {
    setChatType(false);
    try {
      const response = await fetch(`${url}/chat/init`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body:JSON.stringify({idea:idea}),
        credentials: "include"
      });

      const parsedResp = await response.json();
      if(!parsedResp.success || !response.ok ){
        console.error(parsedResp.message);
      }
      setActiveChatId(parsedResp.chat._id);
      setMessages(parsedResp.chat.messages);
      navigate('/chat');
      fetchChats();
    } catch (err) {
      console.error(err);
    }
  }

  const destroyIdea = async () => {
    try {
      const response = await fetch(`${url}/idea/${idea._id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });

      const parsedResponse = await response.json();

      console.log(parsedResponse);
      if (parsedResponse.success == false) {
        return ErrMsg(parsedResponse.message);
      }
      if (ideas.length == 1) {
        set_Ideas([]);
      }
      fetchIdeas();
      return successMsg(parsedResponse.message);
    } catch (err) {
      console.log(err)
      return ErrMsg("Unable to process Your Request at this moment!");
    }
  };

  return (
    <div className="idea-card">
      <div className="cardhead">{idea.title}</div>
      <div className="cardbody">
        <p>
          <span className="idea-blue">Problem</span> : {idea.problem}
        </p>
        <p>
          <span className="idea-blue">Idea</span> : {idea.description}
        </p>
      </div>

      <div className="cardbottom">
        <p>
          <span className="idea-blue">Tech stack</span> : {idea.techStack}
        </p>
      </div>

  <div className="expand">
        <p className="blue sm">Duration : {idea.duration}</p>
        <p className="blue sm">Type : {idea.projectType}</p>
      </div>
      <div className="cardfooter">
        <Button onClick={destroyIdea} variant="outlined" size="small" color="error" startIcon={<DeleteIcon />}>
          Delete
        </Button>
        <Button variant="outlined" size="small" onClick={InitChat}> BrainStorm</Button>
      </div>
    
    </div>
  );
}

export default Idea;
