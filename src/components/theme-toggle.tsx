"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem("setty-theme") as Theme | null) ?? "dark";
    setTheme(saved);
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("setty-theme", next);
  }

  // Evita flash visual antes de hidratar — placeholder com mesmo tamanho
  if (!mounted) {
    return <div className="w-full h-10 rounded-lg" aria-hidden />;
  }

  return (
    <button
      onClick={toggle}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors"
      aria-label={`Mudar para tema ${theme === "dark" ? "claro" : "escuro"}`}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      <span>{theme === "dark" ? "Tema claro" : "Tema escuro"}</span>
    </button>
  );
}
