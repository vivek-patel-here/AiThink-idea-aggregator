import React from "react";
import "./PageNotFound.css";
import { useContext } from "react";
import GlobalContext from "../../GlobalContext.jsx";

function PageNotFound() {

  const {isAuth } =useContext(GlobalContext);
  return (
    <>
      <div className ={isAuth? "pnf color-white":"pnf color-black"}>
        <div class="container">
          <div class="emoji">🧠😵</div>
          <h1>404 – Idea Not Found!</h1>
          <p>
            Looks like this page took a coffee break ☕<br />
            Or got lost in a rabbit hole of X posts and GitHub repos.
          </p>
          <a href="/">🔙 Go Home</a>
          <div class="tip">
            💡 Tip: If the idea doesn’t exist… maybe it’s time to invent it. 😉
          </div>
        </div>
      </div>
    </>
  );
}

export default PageNotFound;
