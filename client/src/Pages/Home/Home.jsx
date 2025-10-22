import "./Home.css";
import { useContext, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import GlobalContext from "../../GlobalContext.jsx";
import Chip from "@mui/material/Chip";
import Footer from "../../components/Footer/Footer.jsx";

function Home() {
  const [query, setQuery] = useState("");
  const {
    ErrMsg,
    url,
    ideas,
    setIdeas,
    keywords,
    SetKeyword,
    xpost,
    setXPost,
    redditPost,
    setRedditPost,
    topRepos,
    setTopRepos,
  } = useContext(GlobalContext);
  const handleChange = (e) => {
    setQuery(() => setQuery(e.target.value));
  };
  const [wait, setWait] = useState(false);

  const example = [
    {
      title: "Trend-Based Idea Suggestions",
      query: "What are the latest AI project ideas trending on GitHub?",
      description:
        "Finds ideas from real-time trends on GitHub, Reddit, and other platforms — ideal for building cutting-edge projects.",
      icon: "ri-line-chart-fill",
    },
    {
      title: "Domain-Specific Ideas",
      query: "Give me some AI project ideas in the healthcare domain.",
      description:
        "Generates ideas based on your preferred industry or domain, like education, finance, agriculture, etc.",
      icon: "ri-heart-pulse-fill",
    },
    {
      title: "Stack or Tool-Based Suggestions",
      query: "Suggest projects I can build using React and Flask.",
      description:
        "Suggests creative and feasible project ideas tailored to the tools or tech stacks you want to work with.",
      icon: "ri-tools-fill",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setQuery("");
      setWait(true);
      const response = await fetch(`${url}/idea/new`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ query: query }),
        credentials: "include",
      });

      const parsedResponse = await response.json();
      console.log(parsedResponse);
      if (!response.ok || parsedResponse.success === false) {
        setWait(false);
        return ErrMsg("Unable to process your request.Try Again");
      }
      setWait(false);
      SetKeyword(parsedResponse.keywords);
      setIdeas(parsedResponse.ideas);
      setRedditPost(parsedResponse.topRedditPost);
      setXPost(parsedResponse.topXpost);
      setTopRepos(parsedResponse.top_repos);
    } catch (err) {
      setWait(false);
      return ErrMsg("Unable to process your request.Try Again");
    }
  };

  return (
    <>
      <div className="home">
        <Navbar />
        <div className="home-container">
          <div className="home-upper">
            <h1>
              Revo<span className="blue">lution</span>izing
            </h1>
            <h1>
              Brainstromi<span className="blue">ng with</span> AI
            </h1>
          </div>
          <p>
            Turn your problems into powerful projects. Discover trending ideas
            and real-world solutions powered by AI from GitHub, Reddit, and
            Twitter.
          </p>
          <form className="home-bottom" onSubmit={handleSubmit}>
            <input
              placeholder="Got an idea? Let's explore it!"
              type="text"
              name="query"
              required
              value={query}
              onChange={handleChange}
            />
            <div className="home-bottom-button">
              {!wait && <button>Get Ideas</button>}
              {wait && <div className="loader"></div>}
            </div>
          </form>
          {ideas && ideas.length == 0 && (
            <div className="example">
              {example.map((ex, i) => {
                return (
                  <ExampleCard
                    title={ex.title}
                    description={ex.description}
                    query={ex.query}
                    icon={ex.icon}
                    key={i}
                    setQuery={setQuery}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* *************keywords************** */}
        {keywords.length !== 0 && (
          <div className="row">
            <h4>RELATED KEYWORDS :</h4>
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
          </div>
        )}

        {/* *************Ideas************** */}

        {ideas.length !== 0 && (
          <div className="home-section">
            <h4>RELATED IDEAS :</h4>
            <div className="home-row">
              {ideas &&
                ideas.map((post, i) => {
                  console.log(post)
                  return <IdeaCard post={post} key={i} />;
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

        {xpost.length !== 0 && (
          <div className="home-section">
            <h4>RELATED Top X Posts :</h4>
            <div className="home-git-container">
              {xpost.map((post, i) => {
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
              })}
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
      <Footer />
    </>
  );
}

function Postcard({ name, owner, link, status, star, watch, isX }) {
  return (
    <div className="git-card">
      <div className="card-head">
        <p>
          {status && <i className="ri-github-fill"></i>} {owner}
          {isX && <i className="ri-twitter-x-line"></i>}
        </p>
        <p>
          {star} {star && <i className="ri-star-s-fill"></i>}{" "}
          {!status && !isX && <i className="ri-reddit-line"></i>}
        </p>
      </div>
      <div className="card-body">{name}</div>

      <div className="card-bottom">
        <a href={link}>
          <Chip color="primary" label="Link" size="small" />
        </a>
        <p>{status}</p>
        <p>
          {watch}
          {watch && <i className="ri-eye-fill"></i>}
        </p>
      </div>
    </div>
  );
}

export function IdeaCard({ post }) {
  const [saved, setSaved] = useState(false);
  const { ErrMsg, url, successMsg } = useContext(GlobalContext);
  const saveToDB = async () => {
    if(saved) return;
    try {
      const response = await fetch(`${url}/idea/save`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          problem: post.problemSolved,
          techStack: post.tech_Stack,
          title: post.title,
          description: post.description,
        }),
        credentials: "include",
      });

      const parsedResponse = await response.json();
      if (!response.ok || parsedResponse.success === false) {
        setSaved(false);
        return ErrMsg(
          parsedResponse.message || "Unable to save this idea.Try Again"
        );
      }
      setSaved(true);
      successMsg("Idea saved successfully");
    } catch (err) {
      setSaved(false);
      return ErrMsg("Unable to save this idea.Try Again");
    }
  };
  return (
    <div className="home-box">
      <h3>{post.title}</h3>
      <i
        className={saved ? "ri-star-fill goldenStar" : "ri-star-fill"}
        onClick={saveToDB}
      ></i>
      <p>
        <span className="highlight">Problem</span> : {post.description}
      </p>
      <p>
        <span className="highlight">Solution</span> : {post.problem_solved}
      </p>
      <p>
        <span className="highlight">Tech Stack</span> : {post.tech_stack}
      </p>
    </div>
  );
}

function ExampleCard({ title, description, query, icon,setQuery }) {
  return (
    <div className="example-card" onClick={()=>setQuery(query)}>
      <button>
        <i className={icon + " example-card-icon"}></i>
      </button>
      <h3>{title}</h3>
      <p className="query-box">Query : {query}</p>
      <p className="description-box">{description}</p>
    </div>
  );
}
export default Home;
