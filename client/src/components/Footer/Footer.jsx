import { Brain } from "lucide-react";

function Footer() {
  return (
    <footer className="relative bg-neutral-950/30 text-neutral-300 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-cyan-400 to-violet-500 grid place-items-center shadow-[0_0_20px_rgba(34,211,238,0.4)]">
              <span className="font-bold text-lg text-black"><Brain/></span>
            </div>
            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-violet-400">
              AiThink
            </h3>
          </div>

          <p className="text-sm text-neutral-400">
            Idea to Reality
          </p>

          <p className="text-xs text-neutral-500">
            © 2025 AiThink <br />
            Made with ❤️ by <span className="text-neutral-300">Vivek</span>
          </p>
        </div>

        {/* Contact */}
        <div>
          <h6 className="text-sm font-semibold text-white mb-3">Contact</h6>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li>📞 +91 8595818416</li>
            <li>✉️ vivek.patel.1057@gmail.com</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h6 className="text-sm font-semibold text-white mb-3">Social</h6>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://github.com/vivek-patel-here"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-neutral-400 hover:text-cyan-400 transition"
              >
                <i className="ri-github-fill text-lg" />
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/vivek-patel2004/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-neutral-400 hover:text-violet-400 transition"
              >
                <i className="ri-linkedin-box-fill text-lg" />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h6 className="text-sm font-semibold text-white mb-3">Legal</h6>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </li>
            <li className="hover:text-white cursor-pointer transition">
              Terms of Use
            </li>
          </ul>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
