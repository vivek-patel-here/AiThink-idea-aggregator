import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spline from '@splinetool/react-spline';
import { useGlobalContext } from "../../GlobalContext";
import clsx from "clsx";
import { ClipLoader } from "react-spinners";

function Auth() {
  //true ->Sign-In and  false->Sign-Up
  const [pageState, setPageState] = useState(true);
  const navigate = useNavigate();
  const { isAuth, setIsAuth, ErrMsg, successMsg, url } = useGlobalContext();
  const [see, setSee] = useState(false);
  const [loader,setLoader] = useState(false);

  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const loginUser = async () => {
    setLoader(true);
    try {
      const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
        credentials: "include",
      });

      const parsedResponse = await response.json();

      if (!response.ok || parsedResponse.success === false) {
        return ErrMsg(parsedResponse.message);
      }

      setIsAuth(true);
      return successMsg("Welcome back.");
    } catch (err) {
      console.error(err);
      ErrMsg("Login failed! Try again later.");
    }finally{
      setLoader(false);
    }
  };

  const signupUser = async () => {
    setLoader(true);
    try {
      const response = await fetch(`${url}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        }),
        credentials: "include",
      });

      const parsedResponse = await response.json();

      if (!response.ok || parsedResponse.success === false) {
        return ErrMsg(parsedResponse.message);
      }

      setIsAuth(true);
      return successMsg("Welcome");
    } catch (err) {
      console.error(err);
      ErrMsg("Registration failed! Try again later.");
    }finally{
      setLoader(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(credentials.email.trim()==="" || credentials.password.trim()==="") return ErrMsg("Please enter valid credential!");
    if (pageState) {
      loginUser();
    } else {
      signupUser();
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/home");
    }
  }, [isAuth]);

  return (
    <div className=" w-screen h-screen flex items-center justify-center ">
      <div className="h-full w-full lg:w-1/2  gap-5 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold">Welcome to Ai Think</h1>



        <div className="w-9/10 lg:w-7/10 h-15  border border-white rounded-xl flex items-center justify-between p-1 cursor-pointer gap-1 bg-neutral-100/90">
          <div
            className={ clsx("flex-1 h-full grid place-items-center  text-lg rounded-xl text-black",pageState === true && "bg-white" )}
            onClick={() => setPageState(true)}
          >
            Sign In
          </div>
          <div
            className={ clsx("flex-1 h-full grid place-items-center  text-lg rounded-xl text-black",pageState === false && "bg-white" )}
            onClick={() => setPageState(false)}
          >
            Signup
          </div>
        </div>

        <form onSubmit={handleSubmit} className=" h-fit flex flex-col gap-5  w-9/10  lg:w-7/10">
          {!pageState && (
            <AuthInput
              placeholder={"Username"}
              type={"text"}
              name={"username"}
              icon={<i className="ri-user-line"></i>}
              value={credentials.username}
              handler={handleChange}
            />
          )}
          <AuthInput
            placeholder={"Email"}
            type={"email"}
            name={"email"}
            icon={<i className="ri-mail-line"></i>}
            value={credentials.email}
            handler={handleChange}
          />

           <div className="w-full border border-white rounded-xl flex items-center gap-3 justify-between h-15 py-1 px-5">
            <div  className="text-xl "><i className="ri-lock-line"></i></div>
            <input
              type={see ? "text" : "password"}
              placeholder={"Password"}
      className="flex-1 h-full outline-0 border-0 pl-2"
              value={credentials.password}

              name={"password"}
              onChange={handleChange}
            />
            {see ? <div className="text-xl" onClick={() => setSee(false)} ><i className="ri-eye-line"></i></div> : <div className="text-xl" onClick={() => setSee(true)}><i className="ri-eye-off-line"></i></div>}
          </div>

          {!loader ? <button className="w-full  h-15 py-1 rounded-xl bg-linear-to-r cursor-pointer from-cyan-400/50 text-xl to-violet-500/50 hover:from-cyan-400/60 hover:to-violet-500/60">{pageState ? "Sign In" : "Signup"}</button>:
          <div className="w-full  h-15 py-1 grid place-items-center rounded-xl bg-linear-to-r cursor-pointer from-cyan-400/50 text-xl to-violet-500/50 hover:from-cyan-400/60 hover:to-violet-500/60">
            <ClipLoader color={"white"}
                  loading={loader}
                  size={35}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                /></div>}
        </form>

        <hr />

        <p className="h-fit max-w-7/10 text-center">
          Turn your problems into powerful projects. Discover trending ideas and
          real-world solutions powered by AI from GitHub, Reddit, and Twitter.
        </p>

      </div>

      <div className=" h-full hidden lg:block w-full lg:w-1/2 relative">
        <h1 className="absolute top-1/7 left-1/2  -translate-x-1/2 -translate-y-1/2 text-8xl font-bold"  >Ai Think</h1>
        <Spline className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' scene="https://prod.spline.design/loI3VkKl1eOfTQKi/scene.splinecode" />
      </div>
    </div>
  );
}

function AuthInput({ placeholder, type, name, icon, value, handler }) {
  return (
    <div className="w-full border border-white rounded-xl flex items-center gap-3 justify-between h-15 py-1 px-5">
      <div className="text-xl "> {icon} </div>
      <input
      className="flex-1 h-full outline-0 border-0 pl-2"
        type={`${type}`}
        placeholder={`${placeholder}`}
        value={value}
        name={`${name}`}
        onChange={handler}
      />
      <div className="auth-icon"  ></div>
    </div>
  );
}

export default Auth;
