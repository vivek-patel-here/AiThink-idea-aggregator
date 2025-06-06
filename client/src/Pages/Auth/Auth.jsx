import React, { useContext, useEffect, useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../../GlobalContext";
function Auth() {
  //true ->Sign-In and  false->Sign-Up
  const [pageState, setPageState] = useState(true);
  const navigate = useNavigate();
  const { isAuth, setIsAuth, ErrMsg, successMsg } = useContext(GlobalContext);

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
      const response = await fetch("http://localhost:8080/auth/login", {
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
      ErrMsg("Login failed! Try again later.");
    }
  };

  const signupUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
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
      return successMsg(parsedResponse.message);
    } catch (err) {
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
    <div className="auth">
      <div className="auth-left">
        <h1>AiThink</h1>

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
        <form onSubmit={handleSubmit}>
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
          <AuthInput
            placeholder={"Password"}
            type={"password"}
            name={"password"}
            icon={<i className="ri-lock-line"></i>}
            value={credentials.password}
            handler={handleChange}
          />
          <button>{pageState ? "Sign In" : "Signup"}</button>
        </form>
        <div className="auth-divider">
          <hr />
          <p>or Continue with</p>
          <hr />
        </div>

        <div className="auth-icon-container">
          <i className="ri-google-fill"></i>
          <i className="ri-instagram-fill"></i>
          <i className="ri-github-fill"></i>
        </div>

        <p className="auth-desc">
          Turn your problems into powerful projects. Discover trending ideas and
          real-world solutions powered by AI from GitHub, Reddit, and Twitter.
        </p>
      </div>

      <div className="auth-right"></div>
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
    </div>
  );
}

export default Auth;
