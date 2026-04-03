/**
 * [INPUT]: react hooks, localStorage
 * [OUTPUT]: ThemeToggle — button that switches data-theme on <html>
 * [POS]: ui/ shared primitive, placed in SystemHeader
 * [PROTOCOL]: update this header on change, then check CLAUDE.md
 */

"use client";

import { useState, useEffect, useCallback } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved =
      (localStorage.getItem("morty-theme") as "dark" | "light" | null) ||
      (localStorage.getItem("fri-theme") as "dark" | "light" | null);

    const initial = saved || "dark";
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  const toggle = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("morty-theme", next);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={toggle}
      className="p-1.5 transition-colors hover:opacity-80"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <img
        src={
          theme === "dark"
            ? "https://unpkg.com/pixelarticons@1.8.1/svg/sun.svg"
            : "https://unpkg.com/pixelarticons@1.8.1/svg/moon.svg"
        }
        className="pa-icon w-4 h-4 inline-block"
        alt=""
        aria-hidden="true"
      />
    </button>
  );
}
