import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Sun, Moon, Menu, X, Home, Info, Settings, User, Mail } from "lucide-react";

const TopBar = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return true;
  });
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const sidebarLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/about", label: "About", icon: Info },
    { to: "#", label: "Profile", icon: User },
    { to: "#", label: "Settings", icon: Settings },
    { to: "#", label: "Contact", icon: Mail },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 h-12 backdrop-blur-xl border-b flex items-center justify-between px-4 gap-4 bg-black/10 dark:bg-white/10 border-black/10 dark:border-white/10">
        {/* Left - Menu + Home */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-md transition-all duration-200 text-foreground/60 hover:text-foreground hover:bg-black/10 dark:hover:bg-white/10 hover:scale-110 active:scale-95"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <Link
            to="/"
            className={`text-sm font-medium transition-all duration-200 hover:scale-105 ${
              location.pathname === "/"
                ? "text-foreground"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Home
          </Link>
        </div>

        {/* Center - Search */}
        <div className="relative group flex items-center">
          <div className="flex items-center h-8 rounded-md border transition-all duration-300 ease-in-out w-12 group-hover:w-64 group-focus-within:w-64 overflow-hidden bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/10 group-hover:bg-black/10 dark:group-hover:bg-white/15 group-focus-within:bg-black/10 dark:group-focus-within:bg-white/15 group-hover:border-black/20 dark:group-hover:border-white/20 group-focus-within:border-black/30 dark:group-focus-within:border-white/30">
            <Search className="shrink-0 ml-2.5 h-3.5 w-3.5 text-foreground/40 transition-colors duration-200 group-hover:text-foreground/70 group-focus-within:text-foreground/70" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-full bg-transparent pl-2 pr-3 text-sm text-foreground placeholder:text-foreground/40 outline-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Right - Theme toggle + About */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark(!dark)}
            className="p-1.5 rounded-md transition-all duration-200 text-foreground/60 hover:text-foreground hover:bg-black/10 dark:hover:bg-white/10 hover:scale-110 active:scale-95"
            aria-label="Toggle theme"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/about"
            className={`text-sm font-medium transition-all duration-200 hover:scale-105 ${
              location.pathname === "/about"
                ? "text-foreground"
                : "text-foreground/60 hover:text-foreground"
            }`}
          >
            About
          </Link>
        </div>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 z-[70] h-full w-64 bg-background border-r border-border shadow-2xl transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="text-sm font-semibold text-foreground">Menu</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-md transition-all duration-200 text-foreground/60 hover:text-foreground hover:bg-muted active:scale-95"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-3">
          {sidebarLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-all duration-200 ${
                location.pathname === item.to
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default TopBar;
