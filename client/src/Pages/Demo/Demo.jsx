import "./Demo.css";
import Navbar from "../../components/Navbar/Navbar.jsx";

function Demo() {
  return (
    <div className="demo">
      <Navbar/>
      <div className="demo-hero">
        <h1>📸 Live Demo</h1>
        <p>
          Welcome to the Demo Page of AiThink! Here, you can explore how the
          platform works through real screenshots and workflow walkthroughs.
        </p>
      </div>
      <div className="demo-content">
        <h1>
      🖋️ What You’ll See
        </h1>
        <ol>
          <li>
            <h3>🔍  Home Page Query Input</h3>
            <p>Users can enter any topic or keyword (e.g., "AI in healthcare") to start discovering relevant content.</p>
          </li>
          <li>
            <h3>🧠  AI-Generated Ideas</h3>
            <p>Instantly receive smart, innovative project ideas tailored to your query.</p>
          </li>
          <li>
            <h3>💻  GitHub Repositories</h3>
            <p>Browse top-starred repositories matching your search—handpicked to inspire developers and contributors.</p>
          </li>
          <li>
            <h3>📱 Trending Posts from X (Twitter)</h3>
            <p>See what the tech world is talking about in real time.</p>
          </li>
          <li>
            <h3>📢 Reddit Threads</h3>
            <p>Dive into community opinions, discussions, and questions that offer deeper context and unique insights.</p>
          </li>
        </ol>

      </div>

      <div className="demo-content">
        <h1>📷 Screenshots & Workflow</h1>
        <p>Below are screenshots of different parts of the app to give you a complete walkthrough of the experience:</p>
        <ul>
          <li>✅ Homepage with Search Input</li>
          <li>🧩 Results Layout with Categorized Sections (Ideas, GitHub, X, Reddit)</li>
          <li>🎨 Responsive Design in Dark Mode</li>
          <li>📱 Mobile and Desktop Views</li>
          <li>💡 Sample Output for Different Queries</li>
        </ul>
      </div>
    </div>
  );
}

export default Demo;
