"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { links, skillGroups } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Blossom } from "@/components/art";

const skillsLink = links[2];

/**
 * One wooden ema plaque (the kind hung at Japanese shrines) on a string.
 * Scrolling makes the plaques swing gently, alternating left and right.
 */
function Ema({
  group,
  index,
  progress,
}: {
  group: (typeof skillGroups)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const dir = index % 2 ? 1 : -1;
  const swing = useTransform(progress, [0, 0.5, 1], [6 * dir, -4 * dir, 3 * dir]);

  return (
    <li className="relative pt-1">
      {/* This plaque's piece of the rope (stays still while the plaque swings) */}
      <span className="absolute -inset-x-3 top-0 h-1 rounded-full bg-wood-ink/60" />
      <motion.div
        style={{ rotate: swing, transformOrigin: "50% 0" }}
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ type: "spring", stiffness: 120, damping: 12, delay: index * 0.08 }}
        className="relative pt-9"
      >
        {/* The string the plaque hangs from */}
        <span className="absolute top-0 left-1/2 h-9 w-px bg-vermilion" />
        <div className="relative bg-wood p-6 pt-10 text-wood-ink shadow-lg [clip-path:polygon(50%_0,100%_14%,100%_100%,0_100%,0_14%)]">
          <span className="absolute top-6 left-1/2 size-2 -translate-x-1/2 rounded-full bg-vermilion" />
          <h3 className="text-center font-serif text-2xl font-extrabold">{group.name}</h3>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {group.items.map((skill, i) => (
              <motion.li
                key={skill}
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.07, type: "spring", stiffness: 300, damping: 18 }}
                className="flex items-center gap-1.5 rounded-full bg-paper/70 px-3 py-1 text-sm font-medium text-ink"
              >
                <Blossom className="size-3.5" />
                {skill}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </li>
  );
}

export function EmaSkills() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} id="skills" className="relative bg-sakura-pale/50 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          kanji={skillsLink.kanji}
          meaning={skillsLink.meaning}
          eyebrow="skills"
          title="What I've learned"
        />
        <div className="relative">
          <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
            {skillGroups.map((g, i) => (
              <Ema key={g.name} group={g} index={i} progress={scrollYProgress} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
