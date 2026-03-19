"use client";

import { useEffect, useState } from "react";

type ThemeMode = "system" | "light" | "dark";

function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = mode === "system" ? systemDark : mode === "dark";
  root.classList.toggle("dark", isDark);
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("system");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as ThemeMode | null;
    const initial: ThemeMode = stored ?? "system";
    setMode(initial);
    applyTheme(initial);
    setReady(true);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if (mode === "system") applyTheme("system");
    };

    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, [mode]);

  const toggle = () => {
    const order: ThemeMode[] = ["system", "light", "dark"];
    const currentIndex = order.indexOf(mode);
    const next = order[(currentIndex + 1) % order.length];
    setMode(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  if (!ready) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="切换主题模式（跟随系统/浅色/深色）"
      className="fixed right-6 top-6 z-50 rounded-full border border-zinc-300 bg-white/90 px-3 py-2 text-sm text-zinc-700 shadow-sm backdrop-blur transition hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-200"
    >
      {mode === "system" ? "🖥️ 跟随系统" : mode === "light" ? "☀️ 浅色" : "🌙 深色"}
    </button>
  );
}
