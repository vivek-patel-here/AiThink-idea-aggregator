import "./Home.css";
import { useContext, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import GlobalContext from "../../GlobalContext.jsx";
import Chip from "@mui/material/Chip";
import Footer from "../../components/Footer/Footer.jsx";

function Home() {
  const [query, setQuery] = useState("");
  const [duration,setDuration] = useState("None");
  const [radio,setRadio] = useState("Personal Project");
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
    if(query.trim()==="") return ErrMsg("Please enter valid query!")
    if(duration==="None") return ErrMsg("Please select Project duration!");
    setWait(true);
    try {
      const response = await fetch(`${url}/idea/new`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ query: query ,projectType:radio,duration:duration }),
        credentials: "include",
      });

      const parsedResponse = await response.json();
      if (!response.ok || parsedResponse.success === false) {
        setWait(false);
        return ErrMsg("Unable to process your request.Try Again");
      }
      SetKeyword(parsedResponse.parsedKeywords);
      setIdeas(parsedResponse.parsedIdeas);
      setRedditPost(parsedResponse.topRedditPost);
      setXPost(parsedResponse.topXpost);
      setTopRepos(parsedResponse.top_repos);
    } catch (err) {
      console.error(err);
      ErrMsg("Unable to process your request.Try Again");
    }
      setWait(false);
      setQuery("");
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
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="home-bottom-button">
              {!wait && <button>Get Ideas</button>}
              {wait && <div className="loader"></div>}
            </div>
          </form>

          <div className="home-config">
            <select name="project-duration" id="duration" className="home-config-select" value={duration} onChange={(e)=>{
              console.log(e.target.value);
              setDuration(e.target.value)}}>
              <option value="None">Project Duration</option>
              <option value="1-3 Days">1-3 Days</option>
              <option value="1 Week">1 Week</option>
              <option value="2 Weeks">2 Weeks</option>
              <option value="3 Weeks">3 Weeks</option>
              <option value="1 Months">1 Months</option>
              <option value="2 Months">2 Months</option>
              <option value="3 Months">3 Months</option>
              <option value="4 Months">4 Months</option>
              <option value="5 Months">5 Months</option>
              <option value="6 Months">6 Months</option>
              <option value="1 year">1 year</option>
            </select>
            <div className="home-config-inputs">
            <div>
              <input onChange={()=>setRadio("Personal Project")} checked={radio==="Personal Project"} type="radio" id="personal-Project" name="project-type" /> <label htmlFor="personal-Project" className="">Personal Project</label>
            </div>
            <div>
              <input onChange={()=>setRadio("Hackathon")} checked={radio==="Hackathon"} type="radio" id="hackathons" name="project-type" /> <label htmlFor="hackathons" className="">Hackathon</label>
            </div>
            <div>
              <input onChange={()=>setRadio("StartUp")} checked={radio==="StartUp"} type="radio" id="startups" name="project-type" /> <label htmlFor="startups" className="">StartUp</label>
            </div>
            </div>
          </div>
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
              {(ideas && ideas.length !== 0) &&
                ideas.map((post, i) => {
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
        <a href={link} target="_blank">
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
    if (saved) return;
    try {
      const response = await fetch(`${url}/idea/save`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          problem: post.problem_solved,
          techStack: post.tech_stack,
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
      console.error(err);
      return ErrMsg("Unable to save this idea.Try Again");
    }
  };
  return (
    <div className="home-box">
      <h3 >{post?.title}</h3>
      <i
        className={saved ? "ri-star-fill goldenStar" : "ri-star-fill"}
        onClick={saveToDB}
      ></i>
      <p>
        <span className="highlight">Idea</span> : {post?.description}
      </p>
      <p>
        <span className="highlight">Problem Solved </span> : {post?.problem_solved}
      </p>
      <p>
        <span className="highlight">Suggested Tech Stack</span> : {post?.tech_stack}
      </p>
    </div>
  );
}

function ExampleCard({ title, description, query, icon, setQuery }) {
  return (
    <div className="example-card" onClick={() => setQuery(query)}>
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
