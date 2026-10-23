"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Github, Search } from "lucide-react";
import { links, projects, projectTags, type ProjectCard } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Blossom } from "@/components/art";

const worksLink = links[3];
const NUMERALS = ["一", "二", "三", "四", "五"];

/** A washi-paper card with its Japanese numeral running down the side. */
function WorkCard({ project }: { project: ProjectCard }) {
  const n = projects.indexOf(project);
  return (
    <motion.li
      layout
      // Cards drift out of the mist: blurred and faded, then sharp
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="washi group relative flex gap-4 rounded-2xl p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-sakura/15 sm:p-7"
    >
      <span className="font-serif text-3xl leading-none font-extrabold text-vermilion [writing-mode:vertical-rl]">
        {NUMERALS[n]}
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <Blossom className="absolute top-4 right-4 size-6 transition-transform duration-700 group-hover:rotate-[72deg]" />
        <h3 className="pr-8 font-serif text-2xl leading-tight font-extrabold">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-mist">{project.about}</p>
        <ul className="mt-4 space-y-1.5 text-sm">
          {project.bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-sakura-deep">・</span>
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-sakura-pale px-3 py-0.5 text-xs font-bold text-sakura-deep"
            >
              {t}
            </span>
          ))}
        </div>
        {(project.code || project.demo) && (
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {project.code && (
              <a
                href={project.code}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-bold text-paper transition-transform hover:scale-105"
              >
                <Github size={15} /> Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-sakura-deep px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-105"
              >
                <ExternalLink size={15} /> Live
              </a>
            )}
          </div>
        )}
      </div>
    </motion.li>
  );
}

export function WashiWorks() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("All");

  /**
   * SEARCH + FILTER
   * `query` (typed text) and `tag` (chosen chip) are React state.
   * Every render, projects.filter() keeps a card only if:
   *   1. its title or one of its technologies includes the query, and
   *   2. the chip is "All" or one of the card's technologies.
   */
  const q = query.trim().toLowerCase();
  const shown = projects.filter((p) => {
    const textOk = !q || p.title.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q));
    const tagOk = tag === "All" || p.tags.includes(tag);
    return textOk && tagOk;
  });

  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          kanji={worksLink.kanji}
          meaning={worksLink.meaning}
          eyebrow="projects"
          title="My works"
        />

        <div className="mx-auto max-w-2xl">
          <label className="flex items-center gap-3 rounded-full border border-line bg-paper px-5 shadow-sm focus-within:border-sakura-deep">
            <Search size={18} className="shrink-0 text-sakura-deep" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or tech… e.g. Python"
              aria-label="Search projects by name or technology"
              className="h-13 w-full min-w-0 bg-transparent text-base outline-none placeholder:text-mist/70"
            />
          </label>
          <div
            className="mt-5 flex flex-wrap justify-center gap-2"
            role="group"
            aria-label="Filter by technology"
          >
            {["All", ...projectTags].map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tag === t}
                onClick={() => setTag(t)}
                className={`rounded-full px-4 py-1.5 text-sm font-bold transition-colors ${
                  tag === t ? "bg-sakura-deep text-white" : "border border-line hover:border-sakura-deep"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-mist" aria-live="polite">
            {shown.length} of {projects.length} projects
          </p>
        </div>

        <motion.ul layout className="mt-12 grid gap-7 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <WorkCard key={p.slug} project={p} />
            ))}
          </AnimatePresence>
        </motion.ul>

        {shown.length === 0 && (
          <div className="washi mx-auto mt-4 max-w-md rounded-2xl p-10 text-center">
            <Blossom className="mx-auto size-10" />
            <p className="mt-4 font-serif text-2xl font-bold">No projects match that search.</p>
            <p className="mt-2 text-sm text-mist">Try “Python”, “Quiz” or “Book”.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setTag("All");
              }}
              className="mt-5 rounded-full bg-sakura-deep px-5 py-2 text-sm font-bold text-white"
            >
              Show all projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
