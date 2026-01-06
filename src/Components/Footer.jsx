import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const footerLinks = {
  About: ["How it works", "Newsroom", "Investors", "Careers"],
  Support: ["Help Center", "Safety", "Cancellation", "COVID-19 Response"],
  Hosting: ["Try hosting", "Resources", "Community", "Responsible hosting"],
  Legal: ["Privacy", "Terms", "Sitemap", "Company details"],
};

const Footer = () => {
  return (
    <footer id="about" className="border-t border-white/20 mt-4 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* TOP LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="cursor-pointer text-gray-400 hover:text-teal-400 transition text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* LEFT */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <p className="text-gray-400 text-sm">
              © 2025 StayScape, Inc. All rights reserved.
            </p>

            <div className="hidden md:flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-teal-400 text-sm">
                Privacy
              </a>
              <span className="text-gray-600">·</span>
              <a href="#" className="text-gray-400 hover:text-teal-400 text-sm">
                Terms
              </a>
              <span className="text-gray-600">·</span>
              <a href="#" className="text-gray-400 hover:text-teal-400 text-sm">
                Sitemap
              </a>
            </div>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10
                           flex items-center justify-center transition-all duration-300
                           hover:scale-110 hover:bg-white/10 hover:border-teal-400/50"
              >
                <Icon className="w-4 h-4 text-gray-400 hover:text-teal-400" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
