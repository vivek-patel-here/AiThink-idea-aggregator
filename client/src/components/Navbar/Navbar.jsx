import { NavLink,Link } from "react-router-dom";
import { useContext, useState } from "react";
import {useGlobalContext} from "../../GlobalContext.jsx"
import clsx from "clsx";
import { Home, CircleAlert,Brain, Lightbulb, BotMessageSquare ,LogOut,TextAlignJustify, X} from "lucide-react";
function Navbar() {
  const { LogoutHandler } = useGlobalContext();
  const [show, setShow] = useState(false);

  const toggleMenu = () => {
    setShow(!show);
  }

  const navLinks = [{
    text: "Home",
    link: "/home",
    icon: Home,
  }, {
    text: "About",
    link: "/about",
    icon: CircleAlert,
  }, {
    text: "My Ideas",
    link: "/idea",
    icon: Lightbulb,
  }, {
    text: "Chat with AI",
    link: "/chat",
    icon: BotMessageSquare,
  }]

  return (
      <div className="min-h-16 h-fit w-full flex items-center lg:flex-row flex-col py-1 lg:py-0 px-3 lg:px-0 gap-2 lg:gap-0 justify-between lg:justify-around border border-white/5 backdrop-blur-2xl fixed top-0 transition-all duration-150 z-50">
      <div className="w-full lg:w-fit h-16 flex items-center justify-between">

        <Link to="/" className="flex h-full items-center gap-2 w-full lg:w-fit">
          <div className=" text-black h-10 w-10 bg-linear-to-br from-cyan-400   to-purple-500  grid place-items-center rounded-xl"><Brain /></div>
          <h1 className=" font-semibold bg-clip-text text-transparent bg-linear-to-r from-cyan-500 via-cyan-500 text-lg to-violet-500  ">AI Think</h1>
        </Link>

         { !show ? <TextAlignJustify size={20} className="text-white lg:hidden " onClick={toggleMenu}/> : <X size={20} className="text-white lg:hidden " onClick={toggleMenu}/>}
      </div>

        <ul className={clsx(" lg:flex-row  lg:flex flex-col w-full h-full text-white lg:w-1/2 gap-3 lg:gap-1 items-center text-sm justify-end" ,show ?"flex":"hidden" )}>
          {
            navLinks.map((Lk, idx) => {
              return <li key={idx} className="w-full lg:w-fit  "  >
                <NavLink to={Lk.link} className={({ isActive }) =>
                  clsx(
                    "flex w-full items-center justify-start lg:justify-center gap-2 px-3 py-3 lg:py-2  rounded-xl transition-all duration-150",
                    isActive
                      ? "bg-cyan-500/30 text-cyan-400"
                      : "text-neutral-400 hover:text-white hover:bg-white/10"
                  )
                }
                >
                  <Lk.icon size={16} />
                  <p className="w-fit">{Lk.text}</p>
                </NavLink>
              </li>

            })
          }

          <button onClick={LogoutHandler} className=" cursor-pointer w-full lg:w-fit  flex items-center  justify-start lg:justify-center gap-2 px-4 py-3 lg:py-2  rounded-xl transition-all duration-150 text-neutral-400 hover:text-white hover:bg-white/10">
          <LogOut size={16}/>
         <p>Logout</p> 
          </button>
        </ul>
      </div>
  );
}

export default Navbar;
