"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { links, rounak } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Blossom, Hanko } from "@/components/art";

const about = links[1];

/**
 * About section. On the left, a hanging scroll (kakemono) unrolls from the top as
 * you scroll: its paper is revealed with a clip-path tied to scroll progress.
 * A red name seal is stamped on once it opens.
 */
export function HangingScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.25"] });
  const unrolled = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clip = useTransform(unrolled, (v) => `inset(0 0 ${v}% 0)`);
  const rodY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const facts = [
    ["Course", "B.Tech CSE"],
    ["Batch", rounak.batch],
    ["Roll no.", rounak.roll],
    ["Based in", "Jaipur"],
  ];

  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          kanji={about.kanji}
          meaning={about.meaning}
          eyebrow="about"
          title="A little about me"
        />

        <div className="grid items-start gap-16 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          {/* The hanging scroll */}
          <div ref={ref} className="relative mx-auto w-full max-w-[17rem]">
            <div className="mx-auto h-3 w-[110%] -translate-x-[4.5%] rounded-full bg-wood-ink shadow" />
            <div className="relative h-[26rem]">
              <motion.div
                style={{ clipPath: clip }}
                className="washi absolute inset-x-0 top-0 flex h-full flex-col items-center justify-between px-6 py-8"
              >
                <Blossom className="size-8" />
                {rounak.photo ? (
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded">
                    <Image
                      src={rounak.photo}
                      alt={`Photo of ${rounak.name}`}
                      fill
                      sizes="240px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  // Vertical name, read top to bottom like a traditional scroll
                  <p className="font-serif text-5xl leading-tight font-extrabold [writing-mode:vertical-rl]">
                    {rounak.first}
                  </p>
                )}
                <motion.div
                  initial={{ scale: 2.2, opacity: 0, rotate: -18 }}
                  whileInView={{ scale: 1, opacity: 1, rotate: -6 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.5 }}
                >
                  <Hanko text={rounak.monogram} className="size-16 bg-paper text-2xl" />
                </motion.div>
              </motion.div>
              {/* Bottom rod rides down as the scroll unrolls */}
              <motion.div
                style={{ top: rodY }}
                className="absolute inset-x-[-5%] -mt-1.5 h-3 rounded-full bg-wood-ink shadow"
              />
            </div>
          </div>

          <div>
            <ul className="space-y-6">
              {rounak.aboutLines.map((line, i) => (
                <motion.li
                  key={line}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.12, duration: 0.6 }}
                  className="flex gap-4 font-serif text-xl font-bold sm:text-2xl"
                >
                  <span className="mt-1 text-sm text-sakura-deep">{["一", "二", "三", "四"][i]}</span>
                  {line}
                </motion.li>
              ))}
            </ul>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-10 leading-relaxed text-mist"
            >
              {rounak.intro}
            </motion.p>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
              {facts.map(([k, v]) => (
                <div key={k} className="bg-paper p-4">
                  <dt className="text-xs text-mist">{k}</dt>
                  <dd className="mt-1 font-serif text-lg font-bold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
