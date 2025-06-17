import "./Demo.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";

function Demo() {
  return (
    <>
    <div className="demo" >
      <Navbar/>
      <div className="demo-content demo-hero" >
        <h1>Live Demo</h1>
        <p>
          Welcome to the Demo Page of AiThink ! Here, you can explore how the
          platform works through real screenshots and workflow walkthroughs.
        </p>
      </div>
      <div className="demo-content">
        <h1>
      Screenshots & Workflow
        </h1>
        <p>Below are screenshots of different parts of the app to give you a complete walkthrough of the experience:</p>

        <ul>
           <li>
            <h3>Register and Login</h3>
            <img src="/demo1.PNG" alt="" />
            <p>After register and logging in, you’ll land on the homepage where the real magic begins.</p>
          </li>
          <li>
            <h3>Home Page Query Input</h3>
            <img src="/demo2.PNG" alt="" />
            <p>Users can enter any topic or keyword (e.g., "AI in healthcare") to start discovering relevant content.</p>
          </li>
          <li>
            <h3>AI-Generated Ideas</h3>
            <img src="/demo3.PNG" alt="" />
            <p>Instantly receive smart, innovative project ideas tailored to your query.</p>
          </li>
          <li>
            <h3>GitHub Repositories</h3>
            <img src="/demo4.PNG" alt="" />
            <p>Browse top-starred repositories matching your search—handpicked to inspire developers and contributors.</p>
          </li>
          <li>
            <h3>Trending Posts from X (Twitter)</h3>
            <img src="/demo5.PNG" alt="" />
            <p>See what the tech world is talking about in real time.</p>
          </li>
          <li>
            <h3>Reddit Threads</h3>
            <img src="/demo6.PNG" alt="" />
            <p>Dive into community opinions, discussions, and questions that offer deeper context and unique insights.</p>
          </li>
        </ul>

      </div>

      
    </div>
    <Footer/>
    </>
  );
}

export default Demo;
