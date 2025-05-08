"use client";

import { useTheme } from "next-themes";
import { useEffect, useCallback } from "react";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "d") {
        e.preventDefault();
        toggleTheme();
      }
    };
    
    document.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleTheme]);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative flex justify-center items-center size-9 aspect-[1/1] rounded-full cursor-pointer"
    >
      <svg className="size-5 opacity-45 scale-0 transition-transform dark:scale-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg>
      <svg className="absolute size-5 opacity-45 scale-100 transition-transform dark:scale-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M224 80a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm96 144a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM432 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 256a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM96 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM352 384a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm0-256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM160 384a32 32 0 1 1 -64 0 32 32 0 1 1 64 0z"/></svg>
    </button>
  );
}