"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { rounak } from "@/lib/data";
import { Branch, Fuji, Hills } from "@/components/art";

/** "CSE student who keeps learning / building / …" */
function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % rounak.rotating.length), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="relative inline-block min-w-[8ch] text-left">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
          transition={{ duration: 0.4 }}
          className="inline-block font-serif font-bold text-sakura-deep"
        >
          {rounak.rotating[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/**
 * Pinned landscape hero (2.2 screens tall). While it is stuck to the screen,
 * scrolling flies you into the scene: the blossom branch sweeps past the camera,
 * the hills and Mt Fuji move at different depths (parallax), the sun/moon sets
 * and mist rolls in to blend into the next section.
 */
export function FujiHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const orbY = useTransform(p, [0, 1], ["0%", "60%"]);
  const fujiScale = useTransform(p, [0, 1], [1, 1.2]);
  const fujiY = useTransform(p, [0, 1], ["0%", "6%"]);
  const hillsScale = useTransform(p, [0, 1], [1, 1.5]);
  const hillsY = useTransform(p, [0, 1], ["0%", "20%"]);
  const branchX = useTransform(p, [0, 1], ["0%", "-45%"]);
  const branchY = useTransform(p, [0, 1], ["0%", "-35%"]);
  const branchScale = useTransform(p, [0, 1], [1, 1.8]);
  const textY = useTransform(p, [0, 0.5], [0, -120]);
  const textOpacity = useTransform(p, [0, 0.4], [1, 0]);
  const mist = useTransform(p, [0.55, 1], [0, 1]);

  return (
    <section ref={ref} id="home" className="relative h-[220vh]">
      <div className="sticky top-0 h-svh overflow-hidden bg-gradient-to-b from-sky via-sky-2 to-sky">
        {/* Sun at dawn, moon at night */}
        <motion.div
          style={{ y: orbY }}
          className="absolute top-[18%] left-1/2 size-[min(38vw,16rem)] -translate-x-1/2 rounded-full bg-orb opacity-80 blur-[1px]"
        />

        <motion.div
          style={{ scale: fujiScale, y: fujiY }}
          className="absolute inset-x-0 bottom-0 h-[62%] origin-bottom"
        >
          <Fuji className="size-full" />
        </motion.div>

        <motion.div
          style={{ scale: hillsScale, y: hillsY }}
          className="absolute inset-x-0 bottom-0 h-[22%] origin-bottom"
        >
          <Hills className="size-full" />
        </motion.div>

        <motion.div
          style={{ x: branchX, y: branchY, scale: branchScale }}
          className="absolute top-12 -left-16 w-[min(70vw,32rem)] origin-top-left"
        >
          <Branch className="h-auto w-full" />
        </motion.div>

        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 flex h-full flex-col items-center justify-start px-5 pt-[24vh] text-center sm:pt-[22vh]"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.6em" }}
            animate={{ opacity: 1, letterSpacing: "0.35em" }}
            transition={{ duration: 1.2 }}
            className="text-xs text-mist uppercase sm:text-sm"
          >
            ようこそ · welcome
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="mt-4 font-serif text-[15vw] leading-none font-extrabold tracking-tight sm:text-8xl lg:text-9xl"
          >
            {rounak.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-lg text-mist sm:text-2xl"
          >
            CSE student who keeps <RotatingWord />
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <a
              href="#projects"
              className="rounded-full bg-sakura-deep px-7 py-3 font-bold text-white shadow-lg shadow-sakura/30 transition-transform hover:-translate-y-0.5"
            >
              View my works
            </a>
            <a
              href="#contact"
              className="rounded-full border-2 border-ink/20 bg-paper/60 px-7 py-3 font-bold backdrop-blur transition-transform hover:-translate-y-0.5"
            >
              Get in touch
            </a>
          </motion.div>
        </motion.div>

        {/* Mist that rolls in at the end so the landscape fades into the page */}
        <motion.div
          style={{ opacity: mist }}
          className="pointer-events-none absolute inset-0 z-20 bg-paper"
        />
      </div>
    </section>
  );
}
