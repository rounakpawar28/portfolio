"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { links, rounak } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Fuji, Hanko } from "@/components/art";

const contactLink = links[4];

/** Contact card in front of Mt Fuji at dusk; the mountain rises as you arrive. */
export function DuskContact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const fujiY = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);

  const rows = [
    { Icon: Mail, label: "Email", value: rounak.email, href: `mailto:${rounak.email}` },
    { Icon: Github, label: "GitHub", value: rounak.github.replace("https://", ""), href: rounak.github },
    { Icon: Linkedin, label: "LinkedIn", value: "Connect on LinkedIn", href: rounak.linkedin },
  ].filter((r) => r.href);

  return (
    <section ref={ref} id="contact" className="relative overflow-hidden pt-28 sm:pt-36">
      <div className="absolute inset-0 bg-gradient-to-b from-paper via-sky-2 to-sky" />
      <motion.div style={{ y: fujiY }} className="absolute inset-x-0 bottom-0 h-[55%]">
        <Fuji className="size-full opacity-70" />
      </motion.div>

      <div className="relative mx-auto max-w-3xl px-5 pb-16">
        <SectionHeading
          kanji={contactLink.kanji}
          meaning={contactLink.meaning}
          eyebrow="contact"
          title="Write to me"
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="washi relative rounded-2xl p-7 shadow-2xl shadow-ink/10 sm:p-10"
        >
          <p className="max-w-lg leading-relaxed text-mist">
            Questions about a project, an idea to build together, or just want to say hello? Pick any way
            below and I&apos;ll get back to you.
          </p>
          <ul className="mt-8 divide-y divide-line">
            {rows.map(({ Icon, label, value, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4 py-4"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sakura-pale text-sakura-deep transition-transform group-hover:rotate-12">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-mist">{label}</span>
                    <span className="block font-bold break-all group-hover:text-sakura-deep">{value}</span>
                  </span>
                </a>
              </li>
            ))}
            <li className="flex items-center gap-4 py-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sakura-pale text-sakura-deep">
                <MapPin size={18} />
              </span>
              <span>
                <span className="block text-xs text-mist">Location</span>
                <span className="block font-bold">{rounak.city}</span>
              </span>
            </li>
          </ul>
          <div className="mt-6 flex items-center justify-end gap-3">
            <span className="font-serif text-lg text-mist">{rounak.name}</span>
            <Hanko text={rounak.monogram} className="size-12 rotate-[-6deg] text-lg" />
          </div>
        </motion.div>

        <p className="relative mt-16 text-center text-sm text-ink/80">
          {rounak.name} · {rounak.college} · Roll {rounak.roll}
        </p>
      </div>
    </section>
  );
}
