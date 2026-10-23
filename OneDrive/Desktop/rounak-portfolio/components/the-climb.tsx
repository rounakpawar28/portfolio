"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { climb } from "@/lib/data";

// Zig-zag trail from the foot of the mountain (bottom) to the summit (top).
const TRAIL = "M60 470 L 220 420 L 120 360 L 250 300 L 150 240 L 240 180 L 170 120 L 200 60";
// Where each station sits on the trail (same order as `climb`, base first).
const STOPS = [
  [60, 470],
  [220, 420],
  [120, 360],
  [250, 300],
  [150, 240],
  [200, 60],
];

/**
 * "The climb": Rounak's learning path drawn as a trail up Mt Fuji.
 * The section is pinned on desktop while you scroll; the trail draws itself
 * station by station and each station's note lights up as you reach it.
 */
export function TheClimb() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });

  return (
    <section ref={ref} aria-label="The climb" className="relative h-[260vh]">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden bg-gradient-to-b from-paper via-sky-2/40 to-paper">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-6 px-5 md:grid-cols-2 md:gap-12">
          <div className="order-2 md:order-1">
            <p className="text-xs tracking-[0.35em] text-sakura-deep uppercase">
              journey · <span className="font-serif tracking-normal">登山</span> (the climb)
            </p>
            <h2 className="mt-3 font-serif text-3xl font-extrabold sm:text-5xl">One station at a time</h2>
            <ol className="mt-6 space-y-2 sm:mt-8 sm:space-y-3">
              {climb.map((stop, i) => (
                <ClimbStep
                  key={stop.station}
                  index={i}
                  total={climb.length}
                  progress={progress}
                  stop={stop}
                />
              ))}
            </ol>
          </div>

          <div className="order-1 mx-auto w-full max-w-[9.5rem] sm:max-w-xs md:order-2 md:max-w-sm">
            <svg viewBox="0 0 300 500" className="h-auto w-full" aria-hidden>
              {/* Mountain silhouette and snow cap */}
              <path
                d="M0 500 C 80 430, 140 250, 180 60 L 220 60 C 250 250, 290 430, 300 500 Z"
                fill="var(--fuji)"
                opacity="0.9"
              />
              <path
                d="M180 60 L 220 60 C 226 90, 232 120, 238 150 L 222 140 L 210 158 L 198 138 L 184 156 L 170 144 C 174 116, 177 88, 180 60 Z"
                fill="var(--snow)"
              />
              {/* The dotted route, and the part already climbed drawn over it */}
              <path
                d={TRAIL}
                fill="none"
                stroke="var(--snow)"
                strokeWidth="2"
                strokeDasharray="2 6"
                opacity="0.6"
              />
              <motion.path
                d={TRAIL}
                fill="none"
                stroke="var(--sakura)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pathLength: progress }}
              />
              {STOPS.map(([x, y], i) => (
                <Station key={i} x={x} y={y} index={i} total={STOPS.length} progress={progress} />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A station marker on the trail that fills in when the climb reaches it. */
function Station({
  x,
  y,
  index,
  total,
  progress,
}: {
  x: number;
  y: number;
  index: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const reached = index / (total - 1);
  const fill = useTransform(progress, [reached - 0.05, reached], [0, 1]);
  return (
    <g>
      <circle cx={x} cy={y} r="9" fill="var(--paper)" stroke="var(--sakura-deep)" strokeWidth="2.5" />
      <motion.circle cx={x} cy={y} r="5" fill="var(--sakura-deep)" style={{ opacity: fill }} />
    </g>
  );
}

/** A station's note in the list; it brightens once the trail reaches it. */
function ClimbStep({
  stop,
  index,
  total,
  progress,
}: {
  stop: (typeof climb)[number];
  index: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const reached = index / (total - 1);
  const opacity = useTransform(progress, [reached - 0.12, reached], [0.3, 1]);
  const x = useTransform(progress, [reached - 0.12, reached], [12, 0]);
  return (
    <motion.li style={{ opacity, x }} className="flex gap-3">
      <span className="w-20 shrink-0 pt-0.5 text-xs font-bold text-sakura-deep uppercase sm:w-24">
        {stop.station}
      </span>
      <span>
        <span className="block font-serif font-bold sm:text-lg">{stop.title}</span>
        <span className="hidden text-sm text-mist sm:block">{stop.text}</span>
      </span>
    </motion.li>
  );
}
