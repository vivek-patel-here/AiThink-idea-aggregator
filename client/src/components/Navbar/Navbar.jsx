import { Link } from "react-router-dom";
import "./Navbar.css";
import { useContext, useState } from "react";
import GlobalContext from "../../GlobalContext";
function Navbar() {
  const { LogoutHandler, open, setOpen } = useContext(GlobalContext);
  return (
    <>
      <div className="navbar">
        <div className="nav-icon-container">
          <div className="nav-icon">
            <i className="ri-planet-fill"></i>
          </div>
          <p>AiThink</p>
        </div>
        <ul>
          <li>
            <Link to="/home" >
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" >
              About
            </Link>
          </li>

          <li>
            <Link to="/demo" >
              Demo
            </Link>
          </li>

          <li>
            <a href="#footer">Get In Touch</a>
          </li>

          <button onClick={LogoutHandler}>
            Logout
          </button>
        </ul>
      </div>
      {/*****************responsive design*********************/}
      <div className="navbar-resp">
        <input type="checkbox" id="toggle" />
        <ul>
          <div className="nav-icon-container">
            <div className="nav-icon">
              <i className="ri-planet-fill"></i>
            </div>
            <p>AiThink</p>
          </div>
          <label htmlFor="toggle" className="close-btn">
            <i className="ri-close-circle-fill"></i>
          </label>
          <li>
            <Link to="/home" className="inner">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="inner">
              About
            </Link>
          </li>

          <li>
            <Link to="/demo" className="inner">
              Demo
            </Link>
          </li>
          <li onClick={LogoutHandler}>
            <a href="#">Logout</a>
          </li>
        </ul>

        {!open && (
          
          <label htmlFor="toggle" id="menu">
            <i className="ri-menu-2-line"></i>
          </label>
        )}
      </div>
    </>
  );
}



export default Navbar;
