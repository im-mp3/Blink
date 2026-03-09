import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Sun, Moon } from "lucide-react";

const TopBar = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return true;
  });
  const [search, setSearch] = useState("");
  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-12 bg-white/10 dark:bg-white/10 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 gap-4">
      {/* Left - Home */}
      <Link
        to="/"
        className={`text-sm font-medium transition-all duration-200 hover:text-white hover:scale-105 ${
          location.pathname === "/" ? "text-white" : "text-white/60"
        }`}
      >
        Home
      </Link>

      {/* Center - Search */}
      <div className="flex-1 max-w-md relative group transition-transform duration-200 hover:scale-[1.02] focus-within:scale-[1.02]">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40 transition-colors duration-200 group-focus-within:text-white/70" />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-8 rounded-md bg-white/10 border border-white/10 pl-8 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition-all duration-200 hover:bg-white/15 hover:border-white/20 focus:border-white/30 focus:bg-white/15"
        />
      </div>

      {/* Right - Theme toggle + About */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDark(!dark)}
          className="p-1.5 rounded-md hover:bg-white/10 transition-all duration-200 text-white/60 hover:text-white hover:scale-110 active:scale-95"
          aria-label="Toggle theme"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <Link
          to="/about"
          className={`text-sm font-medium transition-all duration-200 hover:text-white hover:scale-105 ${
            location.pathname === "/about" ? "text-white" : "text-white/60"
          }`}
        >
          About
        </Link>
      </div>
    </div>
  );
};

export default TopBar;
