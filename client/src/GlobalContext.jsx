import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [ideas, setIdeas] = useState([]);
  const [keywords, SetKeyword] = useState([]);
  const [xpost, setXPost] = useState([]);
  const [redditPost, setRedditPost] = useState([]);
  const [topRepos, setTopRepos] = useState([]);
  const [_ideas, set_Ideas] = useState([]);

  // const url ="https://aithink-idea-aggregator-server.onrender.com"
  const url = "http://localhost:8080";

  const ErrMsg = (msg) => {
    return toast.error(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const successMsg = (msg) => {
    return toast.success(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
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
      return successMsg(parsedResponse.message);
    } catch (err) {
      return ErrMsg("Unable to Logout!");
    }
  };

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
        ErrMsg(parsedResponse.message);
      } catch (err) {
        console.error(err);
        setIsAuth(false);
      }
    };

    checkAuth();
    fetchIdeas();
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalContextProvider };
