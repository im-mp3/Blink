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

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
  ];

  return (
    <>
      {/* Top Navigation - transparent, minimal */}
      <div className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-6">
        {/* Left - Menu button + Brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg transition-all duration-200 text-foreground/50 hover:text-foreground hover:bg-foreground/5 active:scale-95"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <span className="text-base font-semibold tracking-tight text-foreground">
            Blink
          </span>
          <nav className="hidden md:flex items-center gap-1 ml-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-md text-sm transition-all duration-200 ${
                  location.pathname === link.to
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right - Search, Theme toggle */}
        <div className="flex items-center gap-2">
          {/* Expanding search */}
          <div className="relative group flex items-center">
            <div className="flex items-center h-8 rounded-lg border transition-all duration-300 ease-in-out w-8 group-hover:w-56 group-focus-within:w-56 overflow-hidden border-transparent group-hover:border-border group-focus-within:border-border group-hover:bg-foreground/5 group-focus-within:bg-foreground/5">
              <Search className="shrink-0 ml-2 h-3.5 w-3.5 text-muted-foreground transition-colors duration-200 group-hover:text-foreground/70 group-focus-within:text-foreground/70" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-full bg-transparent pl-2 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>

          {/* Theme toggle group */}
          <div className="flex items-center rounded-lg border border-border bg-foreground/5 p-0.5">
            <button
              onClick={() => setDark(false)}
              className={`p-1.5 rounded-md transition-all duration-200 ${
                !dark
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Light mode"
            >
              <Sun className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setDark(true)}
              className={`p-1.5 rounded-md transition-all duration-200 ${
                dark
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label="Dark mode"
            >
              <Moon className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-300 ${
          sidebarOpen
            ? "bg-black/50 backdrop-blur-sm opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 z-[70] h-full w-72 border-r border-border shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-2xl bg-background/80 dark:bg-card/80 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <span className="text-sm font-semibold tracking-tight text-foreground">Menu</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-foreground/5 active:scale-95"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Sidebar nav */}
        <nav className="flex flex-col gap-0.5 p-3">
          {sidebarLinks.map((item, i) => (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                location.pathname === item.to
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
              }`}
              style={{
                transitionDelay: sidebarOpen ? `${i * 30}ms` : "0ms",
                opacity: sidebarOpen ? 1 : 0,
                transform: sidebarOpen ? "translateX(0)" : "translateX(-8px)",
              }}
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
