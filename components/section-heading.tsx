"use client";

import { motion } from "motion/react";

/**
 * Section heading with a large, faint Japanese character behind it
 * (e.g. 技 "skill"), an English eyebrow and a serif title.
 */
export function SectionHeading({
  kanji,
  meaning,
  eyebrow,
  title,
}: {
  kanji: string;
  meaning: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="relative mb-16 text-center">
      <motion.span
        aria-hidden
        initial={{ opacity: 0, scale: 1.3 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 font-serif text-[9rem] leading-none font-extrabold text-sakura/15 sm:text-[12rem]"
      >
        {kanji}
      </motion.span>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7 }}
        className="relative"
      >
        <p className="text-xs tracking-[0.35em] text-sakura-deep uppercase">
          {eyebrow} · <span className="font-serif normal-case tracking-normal">{kanji}</span>{" "}
          <span className="tracking-normal normal-case">({meaning})</span>
        </p>
        <h2 className="mt-3 font-serif text-4xl font-extrabold text-balance sm:text-6xl">{title}</h2>
      </motion.div>
    </div>
  );
}
