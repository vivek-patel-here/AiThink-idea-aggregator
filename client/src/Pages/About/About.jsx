import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";

function About() {
  return (
    <>
      <Navbar />

      <main className="relative min-h-screen text-neutral-200 overflow-hidden">

        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-20%] left-[-10%] h-100 w-100 rounded-full bg-cyan-500/20 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] h-100 w-100 rounded-full bg-violet-500/20 blur-[120px]" />
        </div>

        {/* Hero */}
        <section className="pt-28 pb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight
            bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-violet-500
            [text-shadow:0_0_20px_rgba(139,92,246,0.35)]">
            Discover New Ideas
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-neutral-400 leading-relaxed">
            <span className="text-white font-medium">AiThink</span> is an idea aggregator
            designed to spark creativity by surfacing innovative projects,
            trending technologies, and real-world inspiration from across the web.
          </p>
        </section>

        {/* Content Sections */}
        <section className="max-w-5xl mx-auto px-4 space-y-10 pb-20">

          {/* What we offer */}
          <div className="rounded-3xl p-[1.5px] bg-linear-to-br from-cyan-500/60 to-violet-500/60">
            <div className="rounded-3xl bg-neutral-900/80 backdrop-blur-xl p-8 space-y-4">
              <h2 className="text-xl font-semibold text-white">What You’ll Find</h2>

              <ul className="space-y-3 text-neutral-300">
                <li className="flex gap-3 items-start">
                  <i className="ri-github-fill text-cyan-400 text-lg" />
                  <span>Top open-source repositories from GitHub</span>
                </li>
                <li className="flex gap-3 items-start">
                  <i className="ri-reddit-line text-orange-400 text-lg" />
                  <span>Trending discussions from developer & startup communities</span>
                </li>
                <li className="flex gap-3 items-start">
                  <i className="ri-twitter-x-line text-neutral-100 text-lg" />
                  <span>Insights and trends from X (formerly Twitter)</span>
                </li>
                <li className="flex gap-3 items-start">
                  <i className="ri-gemini-line text-violet-400 text-lg" />
                  <span>AI-generated project ideas tailored to your interests</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Why */}
          <div className="rounded-3xl bg-neutral-900/70 backdrop-blur-xl p-8 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Why We Built This</h2>
            <ul className="space-y-3 text-neutral-400">
              <li>• Centralize inspiration from multiple platforms</li>
              <li>• Help learners find real-world projects to build</li>
              <li>• Assist startups & hackers in spotting trends</li>
              <li>• Save time with curated, relevant ideas</li>
              <li>• Brainstorm with AI on your save ideas</li>
            </ul>
          </div>

          {/* How it works */}
          <div className="rounded-3xl bg-neutral-900/70 backdrop-blur-xl p-8 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">How It Works</h2>
            <ol className="space-y-3 text-neutral-400 list-decimal list-inside">
              <li>Enter a keyword or domain you’re interested in</li>
              <li>We fetch GitHub repos, Reddit posts, X content & AI ideas</li>
              <li>You explore a clean, categorized idea feed</li>
              <li>Explore and brainstorm your idea.</li>
            </ol>
          </div>

          {/* Tech stack */}
          <div className="rounded-3xl bg-neutral-900/70 backdrop-blur-xl p-8 border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">Built With</h2>
            <div className="grid sm:grid-cols-2 gap-3 text-neutral-400">
              <p>1. React + Vite</p>
              <p>2. Express.js</p>
              <p>3. APIs & Web Scraping</p>
              <p>4. AI (OpenAI)</p>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-3xl p-8 text-center bg-linear-to-br from-cyan-500/10 to-violet-500/10 border border-white/10">
            <h2 className="text-2xl font-semibold text-white">
              Join the Movement
            </h2>
            <p className="mt-4 text-neutral-400 max-w-2xl mx-auto">
              Whether you’re building your next side project, preparing for internships,
              or exploring what’s next in tech — <span className="text-white">AiThink</span>{" "}
              is here to fuel your curiosity.
            </p>
          </div>

        </section>
      </main>

      <Footer />
    </>
  );
}

export default About;
