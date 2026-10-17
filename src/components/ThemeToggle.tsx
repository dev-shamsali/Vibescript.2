import { useState } from "react";

const KEY = "vs-theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light",
  );

  const invert = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* storage blocked */
    }
  };

  return (
    <button type="button" onClick={invert} className={className}>
      invert color
    </button>
  );
}
