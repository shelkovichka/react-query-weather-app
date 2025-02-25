import React from "react";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/context/theme-provider.tsx";
import SearchInput from "@/components/search-input";

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95
        backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60"
    >
      <div
        className="container mx-auto flex h-16 items-center
          justify-between px-4"
      >
        <Link to={"/"}>
          <img
            src={isDark ? "/dark-logo.svg" : "/light-logo.svg"}
            alt="Logo"
            className="h-14"
          />
        </Link>

        <div className="flex gap-4">
          <SearchInput />

          <div
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`flex items-center cursor-pointer
              transition-transform duration-500
              ${isDark ? "rotate-180" : "rotate-0"}`}
          >
            {isDark ? (
              <Sun
                className="h-6 w-6 text-yellow-200 rotate-0
                  transition-all"
              />
            ) : (
              <Moon
                className="h-6 w-6 text-blue-300 rotate-0
                  transition-all"
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
