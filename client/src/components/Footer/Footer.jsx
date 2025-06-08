import "./Footer.css";
import { Link,useNavigate } from "react-router-dom";
function Footer() {
  const navigate= useNavigate()

  return (
    <div className="footer" id="footer">
      <div className="footer-hero">
        <img src="/logo.PNG" alt="" />
        <p>AiThink</p>
      </div>
      <div className="footer-content">
        <ul>
          <li onClick={()=>navigate("/home")} className="footer-link"> Homepage</li>
          <li onClick={()=>navigate("/about")} className="footer-link">About</li>
          <li onClick={()=>navigate("/demo/")} className="footer-link">Demo</li>
        </ul>
      </div>
      <div className="footer-content footer-resp" >
        <ul>
          <li>GET IN TOUCH</li>
          <li>+91 8595818416</li>
          <li>vivek.patel.1057@gmail.com</li>
        </ul>
      </div>
      <div className="footer-content">
        <ul>
          <li>
            <a href="https://github.com/vivek-patel-here" target="_blank">
              <i className="ri-github-fill"></i>
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/vivek-patel2004/">
              <i className="ri-linkedin-box-fill"></i>
            </a>
          </li>
          <li>
            <a href="">
              <i className="ri-discord-fill"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="footer-text">
        <p>Copyright 2025 &copy; AiThink</p>
      </div>
      <div className="footer-text">
        <p> Made with ❤️ by Vivek</p>
      </div>
    </div>
  );
}

export default Footer;
