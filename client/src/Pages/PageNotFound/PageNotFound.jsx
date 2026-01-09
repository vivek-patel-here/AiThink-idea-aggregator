import { useContext } from "react";
import GlobalContext from "../../GlobalContext.jsx";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
function PageNotFound() {
  const navigate = useNavigate();

  const {isAuth } =useContext(GlobalContext);
  return (
    <>
      <div className ="w-screen h-screen flex flex-col items-center justify-center text-center gap-5 ">
       
          <div className="text-5xl">🧠😵</div>
          <h1 className="text-7xl">404 – Page Not Found!</h1>
          <p className="max-w-1/2 text-xl text-neutral-300">
            Looks like this page took a coffee break ☕<br />
            Or got lost in a rabbit hole of X posts and GitHub repos.
          </p>
          <p onClick={()=>navigate("/")} className="flex text-2xl bg-linear-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent items-center cursor-pointer justify-items gap-1 animate-pulse"><ArrowLeft stroke="skyblue"/> Go Home</p>
          <div class="tip">
            💡 Tip: If the idea doesn’t exist… maybe it’s time to invent it. 😉
          </div>
        </div>
    </>
  );
}

export default PageNotFound;
