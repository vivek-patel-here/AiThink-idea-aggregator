import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [open,setOpen] =useState(false);

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

  const LogoutHandler = async () => {
    try {
      const response = await fetch("https://aithink-idea-aggregator-server.onrender.com/auth/logout", {
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
        const response = await fetch("https://aithink-idea-aggregator-server.onrender.com/auth/verify", {
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
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isAuth, setIsAuth, ErrMsg, successMsg, LogoutHandler ,open ,setOpen}}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalContextProvider };
