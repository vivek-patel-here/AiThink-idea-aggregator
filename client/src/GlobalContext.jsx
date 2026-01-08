import { createContext, useEffect, useState ,useContext } from "react";
import { toast } from "react-toastify";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [ideas, setIdeas] =  useState([]);
  const [keywords, SetKeyword] = useState([]);
  const [xpost, setXPost] = useState([]);
  const [redditPost, setRedditPost] = useState([]);
  const [topRepos, setTopRepos] = useState([]);
  const [_ideas, set_Ideas] = useState([]);
  const [chats,setChats] = useState([]);
  const [activeChatId,setActiveChatId] = useState(null)
  const [messages,setMessages] = useState([]);
  const [general,setGeneral] =useState([]);
  const [wait, setWait] = useState(false);

  const url ="https://aithink-idea-aggregator-server.onrender.com";
  // const url = "http://localhost:8080";

  const ErrMsg = (msg) => {
    return toast.error(msg, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const successMsg = (msg) => {
    return toast.success(msg, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const fetchIdeas = async () => {
    try {
      const response = await fetch(`${url}/idea/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const parsedResponse = await response.json();
      if (!response.ok || parsedResponse.success == false) {
        throw new Error(parsedResponse.message);
      }
      set_Ideas(parsedResponse.ideas);
    } catch (err) {
      console.error(err);
    }
  };

  const LogoutHandler = async () => {
    try {
      const response = await fetch(`${url}/auth/logout`, {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
        credentials: "include",
      });

      const parsedResponse = await response.json();

      if (parsedResponse.success === false) {
        return ErrMsg("Unable to Logout!");
      }
      setIsAuth(false);
      setIdeas([]);
      SetKeyword([]);
      setXPost([]);
      setRedditPost([]);
      setTopRepos([]);
      set_Ideas([]);
      return successMsg(parsedResponse.message);
    } catch (err) {
      return ErrMsg("Unable to Logout!");
    }
  };

  const fetchChats = async()=>{
    try{
      const resp = await fetch(`${url}/chat/all`,{
        method:'GET',
        headers:{
          "content-type":"application/json"
        },
        credentials:"include"
      })

      const parsedResp = await resp.json();
      if(parsedResp.success===false) return console.error(parsedResp.chats);
      setChats(parsedResp.chats)// [{ id, topic description}]
    }catch(err){
      console.error(err);
    }
  }


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${url}/auth/verify`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
        });

        const parsedResponse = await response.json();
        if (parsedResponse.success && response.ok) {
          return setIsAuth(true);
        }
        setIsAuth(false);
      } catch (err) {
        console.error(err);
        setIsAuth(false);
      }
    };

    checkAuth();
    fetchIdeas();
    fetchChats();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isAuth,
        setIsAuth,
        ErrMsg,
        successMsg,
        LogoutHandler,
        fetchIdeas,
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
        _ideas,
        set_Ideas,
        chats,
        setChats,
        activeChatId,setActiveChatId,messages,setMessages,
        fetchChats,wait, setWait,general,setGeneral
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext=()=>useContext(GlobalContext);
export { GlobalContextProvider };
export default GlobalContext;
