"use client";

import { useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { Moon, Sunrise } from "lucide-react";
import { THEME_KEY } from "@/lib/theme";

function listen(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

/**
 * THEME TOGGLE (dawn ↔ night)
 * The `dark` class on <html> switches every colour variable in globals.css.
 * Clicking adds/removes that class and saves "dark" or "light" in localStorage,
 * so the next visit starts with the same theme.
 */
export function ThemeToggle() {
  const night = useSyncExternalStore(
    listen,
    () => document.documentElement.classList.contains("dark"),
    () => true,
  );

  function toggle() {
    document.documentElement.classList.toggle("dark", !night);
    localStorage.setItem(THEME_KEY, night ? "light" : "dark");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={night ? "Switch to dawn (light) theme" : "Switch to night (dark) theme"}
      className="grid size-10 place-items-center overflow-hidden rounded-full border border-line bg-paper/70 text-sakura-deep backdrop-blur transition-colors hover:bg-sakura-pale"
    >
      <motion.span
        key={night ? "moon" : "sun"}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {night ? <Moon size={18} /> : <Sunrise size={18} />}
      </motion.span>
    </button>
  );
}
