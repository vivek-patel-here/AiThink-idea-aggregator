
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { useGlobalContext } from "../../GlobalContext.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import clsx from "clsx";
import { Brain, Target, Zap, Sparkles, Layers, Scan, TrendingUp, Lightbulb, Github, TwitterIcon, Bot, Star, Clock } from "lucide-react";
import { ClipLoader } from "react-spinners";



function IdeaCard({ post }) {
  const [saved, setSaved] = useState(false);
  const { ErrMsg, url, successMsg } = useGlobalContext();
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
          duration: post.duration,
          projectType: post.projectType
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
    <div className="w-105  h-fit bg-linear-to-br from-cyan-400 to-violet-600 p-px rounded-xl">
      <div className="w-full flex flex-col wrap-break-word justify-between gap-1 h-120 bg-neutral-950/80 rounded-xl p-5">
        <div className="w-full flex items-center justify-between">
          <span className={clsx("border py-1 px-3 rounded-2xl text-xs", post.projectType === 'Hackathon' && "bg-yellow-500/40 text-yellow-500 border-yellow-500", post.projectType === 'Startup Idea' && "bg-blue-500/40 text-blue-500 border-blue-500", post.projectType === 'Personal Project' && "bg-green-500/40 text-green-500 border-green-500")}>{post.projectType}</span>
          <Star fill={saved ? "#FFD700" : ""} stroke="#FFD700" onClick={saveToDB} className="cursor-pointer" />
        </div>
        <h3 className="w-full text-xl capitalize h-fit " >{post?.title}</h3>

        <p className="w-9/10 h-fit text-sm min-h-1/5">
          {post?.description}
        </p>
        <p className="flex w-full flex-col h-fit border gap-1 border-blue-500/30 bg-blue-500/10 min-h-1/5 rounded-2xl p-2 text-blue-500 ">
          <span className="flex items-center gap-2 text-xs"> <Lightbulb size={15} /> Problem Solved </span>
          <span className="text-sm">{post?.problem_solved}</span>
        </p>
        <p className="flex w-full h-fit gap-1 p-2">
          <span className="flex items-center gap-2 text-sm"> <Clock size={15} /> Estimated : </span>
          <span className="text-sm">{post.duration}</span> </p>

        <p className=" w-full min-h-1/5 ">
          <p className="flex flex-col w-full h-fit gap-1 p-2">
            <span className="flex items-center gap-2 text-sm"> <Layers size={15} /> Tech Stack</span>
            <span className="text-xs"></span> {post?.tech_stack} </p>
        </p>

      </div>
    </div>
  );
}

function Home() {
  const [query, setQuery] = useState("");
  const [duration, setDuration] = useState("None");
  const [radio, setRadio] = useState("Personal Project");
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
  } = useGlobalContext();

  const [wait, setWait] = useState(false);

  const options = [
    {
      text: "All Ideas",
      icon: Lightbulb,
      option: 1
    }, {
      text: "GitHub Repos",
      icon: Github,
      option: 2
    }, {
      text: "X-post",
      icon: TwitterIcon,
      option: 3
    }, {
      text: "Reddit Post",
      icon: Bot,
      option: 4
    },

  ]

  const example = [
    {
      title: "Trend-Based Idea Suggestions",
      query: "What are the latest AI project ideas trending on GitHub?",
      description:
        "Finds ideas from real-time trends on GitHub, Reddit, and other platforms — ideal for building cutting-edge projects.",
      icon: TrendingUp,
    },
    {
      title: "Domain-Specific Ideas",
      query: "Give me some AI project ideas in the healthcare domain.",
      description:
        "Generates ideas based on your preferred industry or domain, like education, finance, agriculture, etc.",
      icon: Scan
    },
    {
      title: "Stack or Tool-Based Suggestions",
      query: "Suggest projects I can build using React and Flask.",
      description:
        "Suggests creative and feasible project ideas tailored to the tools or tech stacks you want to work with.",
      icon: Layers
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() === "") return ErrMsg("Please enter valid query!")
    if (duration === "None") return ErrMsg("Please select Project duration!");
    setWait(true);
    try {
      const response = await fetch(`${url}/idea/new`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ query: query, projectType: radio, duration: duration }),
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
  const tags = [
    { text: "Instant Ideas", icon: Zap },
    { text: "Tailored Suggestion", icon: Target },
    { text: "AI Powered", icon: Brain },
  ]

  const radioBtn = [
    {
      text: "Personal Project",
      id: "a5g-ue7",
    },
    {
      text: "Hackathon",
      id: "hfs-6s0",
    },
    {
      text: "StartUp",
      id: "hfd-8jk",
    }
  ];

  const [active, setActive] = useState(1);

  return (
    <>
      <div className="min-h-screen w-screen pt-25 flex flex-col items-center  ">
        <Navbar />

        <div>
          <div className="flex items-center justify-center h-20 w-fit gap-3">
            <div className="shadow-cyan-900 shadow-[0_0_10px_4px_rgba(0,0,0,0.15),0_0_30px_8px_rgba(0,0,0,0.1)] text-black h-15 w-15 bg-linear-to-br from-cyan-400   to-purple-500  grid place-items-center rounded-2xl"><Brain size={35} /></div>
            <h1 className="bg-linear-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent text-3xl font-bold ">AI Think</h1>
          </div>
        </div>

        <div className="max-w-6/10 w-fit text-5xl lg:text-7xl my-10 font-bold text-center ">
          <h1>Revolutionizing</h1>
          <h1><span className="[text-shadow:0_0_10px_rgba(34,211,238,0.4)] bg-clip-text bg-linear-to-r from-cyan-400  to-violet-600 text-transparent">Brainstorming</span> with AI</h1>
        </div>

        <p className="md:text-xl text-lg max-w-9/10 mb-10 lg:max-w-5/10 text-center text-neutral-400">
          Turn your problems into powerful projects. Discover trending ideas
          and real-world solutions powered by AI from GitHub, Reddit, and
          Twitter.
        </p>


        <div className="flex flex-wrap max-w-8/10 lg:max-w-1/2 items-center justify-center gap-3">
          {tags.map((Item, idx) => {
            return <div key={idx} className="flex  items-center justify-center gap-3 border border-cyan-400 px-3 py-1 rounded-3xl text-cyan-400">
              <Item.icon size={18} />
              <p className="text-sm">{Item.text}</p>
            </div>
          })}
        </div>

        <div className="bg-linear-to-br from-cyan-400/30 to-purple-600/30 mt-10 w-9/10 lg:w-fit  h-fit rounded-2xl p-0.5 ">
          <form onSubmit={handleSubmit} className="border flex flex-col border-neutral-800 w-full lg:w-180 h-60 bg-black/60 rounded-2xl  p-3">
            <p className="bg-clip-text bg-linear-to-r from-cyan-400 via-purple-600  to-violet-500 text-transparent flex w-full  items-center gap-2 text-sm"> <Sparkles size={16} color="cyan" /> Describe your interests, problem or domain</p>
            <textarea type="text" className="outline-0 flex-1 min-h-5/10 w-full p-2 rounded my-2 " placeholder="Ex : Generate ideas in the domain of Healthcare. " value={query} onChange={e => setQuery(e.target.value)} />
            <div className="flex w-full h-fit flex-wrap items-center justify-between py-2 px-1">
              {
                radioBtn.map((btn) => {
                  return <div key={btn.id} className="flex items-center justify-center gap-1">
                    <input onChange={() => setRadio(btn.text)} checked={radio === btn.text} type="radio" id={btn.id} name="project-type" />
                    <label htmlFor={btn.id} className="text-sm">{btn.text}</label>
                  </div>
                })
              }
            </div>

            <div className="w-full flex-1 flex items-center justify-between px-1 ">
              <select name="project-duration" id="duration" className="text-white text-sm h-8 w-50 bg-white/15 outline-0 border-0 rounded p-1" value={duration} onChange={(e) => {
                setDuration(e.target.value)
              }}>
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
              {!wait ? <button className="text-sm h-8 px-2 rounded bg-cyan-400/35 text-cyan-400 cursor-pointer">Get Ideas</button>
                : <ClipLoader
                  color={"white"}
                  loading={wait}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />}
            </div>
          </form>
        </div>

        {/* **************** ExampleCard********************* */}
        {ideas && ideas.length === 0 && (
          <div className="flex flex-wrap w-full gap-10 my-30 items-center justify-center ">
            {example.map((ex, i) => {
              return (
                <div className="bg-black/50 border border-white/10 w-fit h-fit p-px rounded-2xl">
                  <div className=" flex rounded-2xl px-2 flex-col w-100 justify-center h-60 gap-2  items-center" onClick={() => setQuery(ex.query)}>
                    <div className="border h-10 w-10 rounded-xl border-cyan-400 text-cyan-400 grid place-items-center">
                      <ex.icon size={30} strokeWidth={3} />
                    </div>
                    <h3 className="font-bold text-xl ">{ex.title}</h3>
                    <p className="text-center w-full text-sm text-neutral-300">Query : {ex.query}</p>
                    <p className="text-center w-full text-sm text-neutral-200">{ex.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}


        {/* *************keywords************** */}
        {ideas && keywords.length !== 0 && (
          <div className="w-9/10  h-fit mt-20  p-2">
            <h4 className="text-cyan-400 text-xl">RELATED KEYWORDS :</h4>
            <div className="flex h-fit items-center mt-5 flex-wrap  justify-start gap-3  text-cyan-400">
              {keywords.map((word, i) => {
                return (
                  <p key={i} className="text-xs border border-cyan-400 rounded-3xl px-3 py-1 ">{word.toUpperCase()}</p>
                );
              })}
            </div>
          </div>
        )}


        {/* *************Ideas************** */}
        {ideas.length !== 0 && (
          <div className="w-9/10  h-fit  my-10 p-2 ">
            <div className="flex w-full items-center h-fit gap-5 ">
              {
                options.map((op, i) => {
                  return <div key={i} className={clsx(" px-3 py-1.5 cursor-pointer rounded-3xl border flex items-center gap-3", active === op.option ? "bg-cyan-400/20 border-cyan-400/30 text-cyan-400 " : " border-white/20 bg-white/10")} onClick={() => setActive(op.option)}>
                    <op.icon size={18} />
                    <p className="text-xs">{op.text}</p>
                  </div>
                })
              }
            </div>

            <div className="flex flex-wrap gap-5 my-3 items-center  w-full justify-center h-fit ">
              {(active === 1 && ideas && ideas.length !== 0) &&
                ideas.map((post, i) => {
                  return <IdeaCard post={post} key={i} />;
                })}

              {(active === 2 && topRepos.length !== 0) && topRepos.map((repo, indx) => {
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

              {(active === 3 && xpost.length !== 0) && xpost.map((post, i) => {
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

              {(active === 4 && redditPost.length !== 0) && redditPost.map((post, i) => {
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
    <div className="border border-white/20 bg-black/30 w-100 rounded-2xl min-h-40 p-2 flex flex-col items-center justify-between">
      <div className="w-full flex items-center justify-between">
        <p className="text-lg">
          {status && <i className="ri-github-fill text-cyan-400 text-lg" />} {owner}
          {isX && <i className="ri-twitter-x-line"></i>}
        </p>
        <p>
          {star} {star && <i className="ri-star-s-fill"></i>}{" "}
          {!status && !isX &&  <i className="ri-reddit-line text-orange-400 text-lg" />}
        </p>
      </div>

      <div className="text-md w-full h-fit my-2">{name}</div>

      <div className="w-full flex items-center gap-3">
        <a href={link} target="_blank" className="border border-cyan-400 px-3 py-1 rounded-2xl">
          <p className="text-xs text-cyan-500">Link</p>
        </a>
        <p>{status}</p>
        <p className="flex items-center justify-center gap-1">
          {watch}
          {watch && <i className="ri-eye-fill"></i>}
        </p>
      </div>

    </div>
  );
}




export default Home;
