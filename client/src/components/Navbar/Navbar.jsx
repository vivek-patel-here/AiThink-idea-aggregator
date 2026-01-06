import { Link } from "react-router-dom";
import "./Navbar.css";
import { useContext, useState } from "react";
import GlobalContext from "../../GlobalContext";
function Navbar() {
  const { LogoutHandler } = useContext(GlobalContext);
  const [show, setShow] = useState(false);

  const toggleMenu = () => {
    setShow(!show);
  }

  return (
    <>
      <div className="navbar nav-blur">
        <Link to="/" className="nav-logo">
          <div className="nav-icon">
            <i className="ri-planet-fill"></i>
          </div>
        </Link>


        {/*********desktop navbar options************/}
        <ul className="nav-links">
          <li >
            <Link to="/home" >Home</Link>
          </li>
          <li >
            <Link to="/idea" >Ideas</Link>
          </li>
          <li >
            <Link to="/chat" >Chats</Link>
          </li>
          <li >
            <Link to="/about" >About</Link>
          </li>

          {/* <li >
            <Link to="/demo" >Demo</Link>
          </li> */}



          <button onClick={LogoutHandler}>Logout</button>
        </ul>


        {/*********mobile navbar options************/}
        <ul className={show ? "nav-links-mobile" : "nav-links-mobile-hide"}>
          <li >
            <Link to="/home" >Home</Link>
          </li>
          <li >
            <Link to="/idea" >Ideas</Link>
          </li>
          <li >
            <Link to="/chat" >Chats</Link>
          </li>

          <li >
            <Link to="/about" >About</Link>
          </li>

          {/* <li >
            <Link to="/demo" >Demo</Link>
          </li> */}



          <button onClick={LogoutHandler}>Logout</button>
        </ul>


        <div className="nav-btn">
          <button className="nav-btn-mobile" onClick={toggleMenu}>
            {show ? <i className="ri-close-fill"></i> : <i className="ri-menu-3-fill"></i>}
          </button>
        </div>

      </div>
    </>
  );
}

export default Navbar;
