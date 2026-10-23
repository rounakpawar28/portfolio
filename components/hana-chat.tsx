"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Send, X } from "lucide-react";
import { bot, chatStarters, rounak } from "@/lib/data";
import { Blossom, Fuji } from "@/components/art";

type Msg = { from: "me" | "bot"; text: string; oops?: boolean };

const SORRY = "Sorry, I couldn't reach the AI right now. Please try again in a moment.";

export function HanaChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [msgs, loading]);

  /**
   * CHATBOT: send the chat so far to /api/chat (our own server route, which
   * talks to Gemini). Network errors, a missing key or a 429 quota error all
   * end up in the catch and show a friendly message instead of crashing.
   */
  async function ask(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    const next: Msg[] = [...msgs, { from: "me", text: q }];
    setMsgs(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => !m.oops) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.reply) throw new Error(data.error ?? "failed");
      setMsgs([...next, { from: "bot", text: data.reply }]);
    } catch {
      setMsgs([...next, { from: "bot", text: SORRY, oops: true }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : `Chat with ${bot.name}`}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed right-4 bottom-4 z-50 flex h-14 items-center gap-2 rounded-full bg-ink pr-5 pl-2 text-paper shadow-xl shadow-ink/25 sm:right-6 sm:bottom-6"
      >
        <span className="grid size-10 place-items-center rounded-full bg-paper">
          {open ? <X size={20} className="text-ink" /> : <Blossom className="size-8 animate-spin-slow" />}
        </span>
        <span className="font-serif font-bold">{open ? "Close" : `Ask ${bot.name}`}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={`${bot.name}, the chat assistant`}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            style={{ transformOrigin: "bottom right" }}
            className="washi fixed inset-x-3 bottom-22 z-50 flex h-[min(34rem,calc(100svh-10rem))] flex-col overflow-hidden rounded-2xl shadow-2xl shadow-ink/25 sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[23rem]"
          >
            <div className="relative h-20 shrink-0 overflow-hidden bg-gradient-to-b from-sky-2 to-sky">
              <Fuji className="absolute inset-x-0 bottom-0 h-14 w-full opacity-80" />
              <div className="relative flex items-center gap-2 px-5 pt-3">
                <Blossom className="size-6" />
                <div>
                  <p className="font-serif text-xl font-extrabold">{bot.name} 花</p>
                  <p className="text-xs text-mist">{bot.tagline}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {msgs.length === 0 && (
                <>
                  <p className="w-fit max-w-[85%] rounded-2xl rounded-tl-sm bg-sakura-pale px-4 py-3 text-sm">
                    Konnichiwa! I&apos;m {bot.name}. Ask me about {rounak.first}&apos;s projects, skills or
                    how to get in touch.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {chatStarters.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => ask(s)}
                        className="rounded-full border border-line px-3 py-1.5 text-xs font-bold transition-colors hover:border-sakura-deep hover:text-sakura-deep"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {msgs.map((m, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`w-fit max-w-[85%] px-4 py-2.5 text-sm whitespace-pre-wrap ${
                    m.from === "me"
                      ? "ml-auto rounded-2xl rounded-br-sm bg-ink text-paper"
                      : m.oops
                        ? "rounded-2xl rounded-tl-sm border border-vermilion/50 bg-vermilion/10"
                        : "rounded-2xl rounded-tl-sm bg-sakura-pale"
                  }`}
                >
                  {m.text}
                </motion.p>
              ))}

              {loading && (
                <div
                  className="flex w-fit items-center gap-2 rounded-2xl bg-sakura-pale px-4 py-2.5 text-xs text-mist"
                  aria-label="Typing"
                >
                  <Blossom className="size-4 animate-spin" />
                  {bot.name} is thinking…
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex gap-2 border-t border-line p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a question…"
                aria-label="Your question"
                maxLength={500}
                className="min-w-0 flex-1 rounded-full border border-line bg-paper px-4 py-2.5 text-base outline-none placeholder:text-mist/70 focus:border-sakura-deep sm:text-sm"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-sakura-deep text-white disabled:opacity-40"
              >
                <Send size={17} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
