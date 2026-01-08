import React, { useContext, useEffect, useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../GlobalContext";
import Robot from "../../components/3DRobot/Robot.jsx"
function Auth() {
  //true ->Sign-In and  false->Sign-Up
  const [pageState, setPageState] = useState(true);
  const navigate = useNavigate();
  const { isAuth, setIsAuth, ErrMsg, successMsg, url } = useContext(GlobalContext);
  const [see,setSee] = useState(false);

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
      return successMsg(parsedResponse.message);
    } catch (err) {
      console.error(err);
      ErrMsg("Login failed! Try again later.");
    }
  };

  const signupUser = async () => {
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div className="auth ">
      <div className="auth-left ">
        <h1 className="lg:hidden text-xl font-bol ">Ai Think</h1>

        <div className="auth-txt">
          <h1>Welcome Back</h1>
          <p>Welcome Back , Please enter Your details</p>
        </div>
        <div className="auth-btn">
          <div
            className={pageState === true ? "auth-btn-active" : ""}
            onClick={() => setPageState(true)}
          >
            Sign In
          </div>
          <div
            className={pageState === false ? "auth-btn-active" : ""}
            onClick={() => setPageState(false)}
          >
            Signup
          </div>
        </div>
        <form onSubmit={handleSubmit} className="mt-5">
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

          <div className="auth-input">
            <div className="auth-icon"><i className="ri-lock-line"></i></div>
            <input
              type={see?"text":"password"}
              placeholder={"Password"}
              value={credentials.password}

              name={"password"}
              onChange={handleChange}
            />
            {see? <div className="auth-icon" onClick={()=>setSee(false)} ><i class="ri-eye-line"></i></div> : <div className="auth-icon" onClick={()=>setSee(true)}><i class="ri-eye-off-line"></i></div>}
          </div>

          <button className="w-full  h-10 py-1 rounded-xl bg-linear-to-r from-cyan-400 font-bold to-violet-500">{pageState ? "Sign In" : "Signup"}</button>
        </form>
        <div className="auth-divider">
          <hr />
          {/* <p></p>
          <hr /> */}
        </div>

        {/* <div className="auth-icon-container">
          <i className="ri-google-fill"></i>
          <i className="ri-instagram-fill"></i>
          <i className="ri-github-fill"></i>
        </div> */}

        <p className="auth-desc">
          Turn your problems into powerful projects. Discover trending ideas and
          real-world solutions powered by AI from GitHub, Reddit, and Twitter.
        </p>
      </div>

      <div className="auth-right">
        <h1>Ai Think</h1>
        <img src="/gradient.png" alt="" />
        <Robot />
      </div>
    </div>
  );
}

function AuthInput({ placeholder, type, name, icon, value, handler }) {
  return (
    <div className="auth-input">
      <div className="auth-icon"> {icon} </div>
      <input
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
