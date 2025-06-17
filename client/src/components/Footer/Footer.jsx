import "./Footer.css";
import { Link, useNavigate } from "react-router-dom";
function Footer() {
  const navigate = useNavigate();

  return (
    <div className="footer" id="footer">
      <div className="footer-left">
        <div className="footer-logo">
          <img src="/logo.PNG" alt="" />
          <p>AiThink</p>
        </div>
        <p>Idea to Reality</p>
        <p className="footer-copyright">
          <span>&copy; 2025 AiThink</span> <span>Made with ❤️ by Vivek </span>
        </p>
      </div>
      <div className="footer-right">
        <div className="footer-div1">
          <h6>Contact</h6>
          <p>+91 8595818416</p>
          <p>vivek.patel.1057@gmail.com</p>
        </div>
        <div className="footer-div2">
          <h6>Social</h6>
          <p>
            <a href="https://github.com/vivek-patel-here" target="_blank">
              <i className="ri-github-fill"></i> GitHub
            </a>
          </p>
          <p>
            <a href="https://www.linkedin.com/in/vivek-patel2004/">
              <i className="ri-linkedin-box-fill"></i> LinkedIn
            </a>
          </p>
        </div>
        <div className="footer-div3">
          <h6>Legal</h6>
          <p>Privacy Policy</p>
          <p>Terms of use</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;


