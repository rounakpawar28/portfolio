"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { links, rounak } from "@/lib/data";
import { ThemeToggle } from "@/components/theme-toggle";
import { Hanko } from "@/components/art";

/** Minimal top bar with a name seal; it gains a paper background once you scroll. */
export function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled || open ? "border-b border-line bg-paper/85 backdrop-blur-md" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#home" className="flex items-center gap-2.5">
          <Hanko text="R" className="size-8 text-lg" />
          <span className="font-serif text-xl font-bold">{rounak.first}</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative px-4 py-2 text-sm font-medium text-mist transition-colors hover:text-ink"
            >
              {l.label}
              {/* A brush-like stroke grows under the link on hover */}
              <span className="absolute inset-x-4 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-sakura-deep transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full border border-line md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-t border-line px-6 py-3.5"
              >
                <span className="w-6 font-serif text-xl text-sakura-deep">{l.kanji}</span>
                <span className="text-lg">{l.label}</span>
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
