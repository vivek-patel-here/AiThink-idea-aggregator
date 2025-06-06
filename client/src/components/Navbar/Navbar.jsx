import { Link } from "react-router-dom";
import "./Navbar.css";
import { useContext, useState } from "react";
import GlobalContext from "../../GlobalContext";
function Navbar() {
  const { LogoutHandler } = useContext(GlobalContext);
  const [open,setOpen] =useState(false);
  return (
    <>
      <div className="navbar">
        <div className="nav-icon">
          <i className="ri-planet-fill"></i>
        </div>

        <ul>
          <li>
            Home
            <Link to="/home" className="inner">
              Home
            </Link>
          </li>
          <li>
            About
            <Link to="/about" className="inner">
              About
            </Link>
          </li>

          <li>
            Demo
            <Link to="/demo" className="inner">
              Demo
            </Link>
          </li>
        </ul>

        <button onClick={LogoutHandler}>
          Logout
          <div className="inner">Logout</div>
        </button>

        <button>
          Get In Touch
          <div className="inner">Get In Touch</div>
        </button>
      </div>
      {/*****************responsive design*********************/}
      <div className="navbar-resp">
        <input type="checkbox" id="toggle" />
        <div className="nav-icon">
          <i className="ri-planet-fill"></i>
        </div>
        <ul>
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

       {!open && <label htmlFor="toggle" id="menu" >
          <i className="ri-menu-2-line" ></i>
        </label>}
      </div>
    </>
  );
}

export default Navbar;
