# Rounak Pawar: Portfolio

Personal portfolio of **Rounak Pawar**, B.Tech CSE student at JECRC University, Jaipur (batch 2025, roll 25BCON2335).
Built for the internal assessment: Home, About Me, Skills, Projects, Contact and an AI chatbot.

**Live site:** _add the Vercel link here after deploying_

## Design

**Sakura & Mount Fuji**: a Japanese-inspired theme. Light mode is dawn (a soft pink sky, a peach sun and an indigo Mt Fuji); dark mode is a moonlit night with glowing blossoms.
Fonts: Shippori Mincho + Zen Kaku Gothic New. Dark-first with a light theme, fully responsive, and it respects *Reduce motion*.

## Technologies

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- Motion (`motion/react`) for scroll-driven animation (`useScroll`, `useTransform`, `useSpring`)
- Google Gemini API (`@google/genai`) for the chatbot, called server-side only
- lucide-react icons
- Deployed on Vercel

## Features

- **Fuji hero**: a pinned landscape; as you scroll, the blossom branch sweeps past, the hills and Mt Fuji move at different depths (parallax), the sun or moon sets and mist rolls in.
- **Falling sakura petals** across the whole page; scrolling fast blows them sideways like a gust of wind.
- **About**: a hanging scroll (kakemono) that unrolls as you scroll, stamped with a red "RP" name seal.
- **Skills**: wooden ema plaques hanging from a rope that swing gently on scroll; skills bloom in one by one.
- **Projects**: washi-paper cards numbered 一 to 五 that drift out of the mist, with live search, tech chips and an empty state.
- **The climb**: a pinned section where a trail up Mt Fuji draws itself and each learning stage lights up as you reach it.
- **Contact**: a card in front of Mt Fuji at dusk, signed with the name seal.
- Each section heading has a large faint Japanese character behind it (始 beginning, 私 me, 技 skill, 作 works, 便 letter).
- **Light / dark toggle**: saved in `localStorage`; on first visit it follows the device's `prefers-color-scheme`.
- **AI chatbot (Hana, "flower")**: floating button → chat panel on every section, with suggested questions, a typing indicator and friendly error messages.

All text lives in one file, **`lib/data.ts`**. The page and the chatbot both read from it.

## How the key parts work

| Feature | Where | How |
| --- | --- | --- |
| Project search + filter | `components/washi-works.tsx` | The search text and selected chips are React state. Each render runs `.filter()` on the projects: a project stays if its **name or any technology** contains the text **and** it matches the chip filter. Try "Python", "Quiz" or "Book". |
| Theme toggle | `components/theme-toggle.tsx` + `lib/theme.ts` | A small script in `<head>` applies the saved theme (or the system one) before the page paints. The button toggles the `dark` class on `<html>` and saves the choice to `localStorage`. |
| Chatbot | `components/hana-chat.tsx` → `app/api/chat/route.ts` | Browser → `POST /api/chat` with the conversation → the server route calls **Gemini (`gemini-2.5-flash`, falling back to `gemini-2.5-flash-lite` on quota errors)** with a system prompt built from `lib/data.ts` and `GEMINI_API_KEY` from the environment → the reply is shown in the panel. Any failure shows: *"Sorry, I couldn't reach the AI right now. Please try again in a moment."* |

The API key is **never** sent to the browser: it has no `NEXT_PUBLIC_` prefix and `.env*` files are git-ignored.

## Run it locally

```bash
npm install
cp .env.example .env.local   # then paste your key after GEMINI_API_KEY=
npm run dev
```

Open http://localhost:3000. Get a free key at https://aistudio.google.com/apikey.

## Deploy on Vercel

1. Push this folder to a new GitHub repo.
2. Import it in Vercel → **Settings → Environment Variables** → add `GEMINI_API_KEY`.
3. Deploy, then paste the live URL at the top of this README.
