import "./Home.css";
import { useContext, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import GlobalContext from "../../GlobalContext.jsx";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

function Home() {
  const [query, setQuery] = useState("");
  const { ErrMsg } = useContext(GlobalContext);
  const handleChange = (e) => {
    setQuery(() => setQuery(e.target.value));
  };
  const [wait, setWait] = useState(false);
  const [keywords, SetKeyword] = useState([]);
  const [xpost, setXPost] = useState([]);
  const [redditPost, setRedditPost] = useState([]);
  const [topRepos, setTopRepos] = useState([]);
  const [ideas, setIdeas] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setQuery("");
      setWait(true);
      const response = await fetch("http://localhost:8080/idea/new", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
        credentials: "include",
      });

      const parsedResponse = await response.json();
      if (!response.ok || parsedResponse.success === false) {
        return ErrMsg("Unable to process your request.Try Again");
      }
      console.log(parsedResponse);
      setWait(false);
      SetKeyword(parsedResponse.keywords);
      setIdeas(parsedResponse.ideas);
      setRedditPost(parsedResponse.topRedditPost);
      setXPost(parsedResponse.topXpost);
      setTopRepos(parsedResponse.top_repos);
    } catch (err) {
      return ErrMsg("Unable to process your request.Try Again");
    }
  };

  return (
    <div className="home">
      <Navbar />
      <div className="home-container">
        <div className="home-upper">
          <h1>Revolutionizing</h1>
          <h1>Brainstroming with AI</h1>
        </div>
        <p>
          Turn your problems into powerful projects. Discover trending ideas and
          real-world solutions powered by AI from GitHub, Reddit, and Twitter.
        </p>
        <form className="home-bottom" onSubmit={handleSubmit}>
          <input
            placeholder="Drop Your Idea here"
            type="text"
            name="query"
            required
            value={query}
            onChange={handleChange}
          />
          {!wait && <button>Get Ideas</button>}
          {wait && <div className="loader"></div>}
        </form>
      </div>

      {/* *************keywords************** */}
      {keywords.length !== 0 && (
        <div className="row">
          <h4>RELATED KEYWORDS :</h4>
          <Stack direction="row" spacing={1}>
            {keywords.map((word, i) => {
              return (
                <Chip
                  label={word.toUpperCase()}
                  color="primary"
                  variant="outlined"
                  key={i}
                />
              );
            })}
          </Stack>
        </div>
      )}

      {/* *************Ideas************** */}

      {ideas.length !== 0 && (
        <div className="home-section">
          <h4>RELATED IDEAS :</h4>
          <div className="home-row">
            {ideas.map((post, i) => {
              return (
                <div className="home-box" key={i}>
                  <h3>{post.title}</h3>
                  <p>
                    <span className="highlight">Problem</span> :{" "}
                    {post.problemSolved}
                  </p>
                  <p>
                    <span className="highlight">Solution</span> :{" "}
                    {post.description}
                  </p>
                  <p>
                    <span className="highlight">Tech Stack</span> :{" "}
                    {post.tech_Stack}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ************github repos************** */}

      {topRepos.length !== 0 && (
        <div className="home-section">
          <h4>RELATED GitHub Repositories :</h4>
          <div className="home-git-container">
            {topRepos.map((repo, indx) => {
              return (
                <Postcard
                key={indx}
                  name={repo.name}
                  owner={repo.owner}
                  link={repo.link}
                  status={repo.visibility}
                  star={repo.stars}
                  watch={repo.watchers}
                  isX={false}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* ************X posts************** */}

      {xpost.length!==0 && (
        <div className="home-section">
          <h4>RELATED Top X Posts :</h4>
          <div className="home-git-container">
           {
            xpost.map((post,i)=>{
              return (
                <Postcard
                  name={post.title}
                  owner={post.author}
                  link={post.link}
                  status={null}
                  star={null}
                  key={i}
                  watch={null}
                  isX={true}
                />
              );
            })
           }
          </div>
        </div>
      )}

      {/* ************reddit  posts************** */}
      {redditPost.length !== 0 && (
        <div className="home-section">
          <h4>RELATED Top Reddit posts :</h4>
          <div className="home-git-container">
            {redditPost.map((post, i) => {
              return (
                <Postcard
                  name={post.title}
                  owner={post.author}
                  link={post.link}
                  status={null}
                  star={null}
                  key={i}
                  watch={null}
                  isX={false}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Postcard({ name, owner, link, status, star, watch ,isX}) {
  return (
    <div className="git-card">
      <div className="card-head">
        <p>{status &&   <i className="ri-github-fill"></i>} {owner}
        {isX && <i className="ri-twitter-x-line"></i>}</p>
        <p>
          {star} {star && <i className="ri-star-s-fill"></i>}{" "}
          {!status && !isX && <i className="ri-discord-fill"></i>}
        </p>
      </div>
      <div className="card-body">
     {name}
      </div>

      <div className="card-bottom">
        <a href={link}>
          <Chip color="primary" label="Link" size="small" />
        </a>
        <p>{status}</p>
        <p>{watch}{watch && <i className="ri-eye-fill"></i>}</p>
      </div>
    </div>
  );
}



export default Home;
