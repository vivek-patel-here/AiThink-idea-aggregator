import React from "react";
import "./PageNotFound.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
function PageNotFound() {
  return (
    <>
      <div className = "pnf">
        <Navbar />
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
      <Footer />
    </>
  );
}

export default PageNotFound;
