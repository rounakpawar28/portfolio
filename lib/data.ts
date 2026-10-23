/**
 * Rounak's portfolio content, kept in one place.
 * Every section reads from here, and `chatbotInstructions()` turns the same data
 * into the Gemini system prompt, so the site and the chatbot always match.
 */

export type ProjectCard = {
  slug: string;
  title: string;
  about: string;
  bullets: string[];
  tags: string[];
  code: string;
  demo?: string;
};

// GitHub username: repo links are built from it.
const GH = "rounakpawar28";
const LINKEDIN = "https://www.linkedin.com/in/rounak-pawar-b46318382/";

const gh = (repoName: string) => (GH ? `https://github.com/${GH}/${repoName}` : "");

export const rounak = {
  name: "Rounak Pawar",
  first: "Rounak",
  monogram: "RP",
  course: "B.Tech in Computer Science & Engineering",
  college: "JECRC University, Jaipur",
  batch: "2025",
  roll: "25BCON2335",
  city: "Jaipur, Rajasthan, India",
  email: "rounak.25bcon2335@jecrcu.edu.in",
  github: GH ? `https://github.com/${GH}` : "",
  linkedin: LINKEDIN,
  // Rounak chose not to show a photo, so the "RP" monogram is displayed instead.
  photo: "",
  // Rotating words in the hero: "CSE student who keeps …"
  rotating: ["learning", "building", "debugging", "climbing"],
  intro:
    "I'm Rounak, a first-year Computer Science student at JECRC University in Jaipur. I like building things I can share: a quiz friends can play, a reading list that remembers what you're reading. I work in short build–test–fix loops, use AI tools to get unstuck faster, and I'm always looking for the next small project that pushes my skills a little further.",
  aboutLines: [
    "I like building things people can actually use.",
    "Small projects, finished properly, then shared.",
    "Tests catch my mistakes before anyone else does.",
    "AI helps me learn faster, but I keep the understanding.",
  ],
};

// "Hana" means flower in Japanese, matching the sakura theme.
export const bot = {
  name: "Hana",
  tagline: `Ask me anything about ${rounak.first}`,
};

// Each section also has a Japanese word, shown as a large faint character behind its heading.
export const links = [
  { href: "#home", label: "Home", kanji: "始", meaning: "beginning" },
  { href: "#about", label: "About", kanji: "私", meaning: "me" },
  { href: "#skills", label: "Skills", kanji: "技", meaning: "skill" },
  { href: "#projects", label: "Projects", kanji: "作", meaning: "works" },
  { href: "#contact", label: "Contact", kanji: "便", meaning: "letter" },
];

// Each skill group hangs as a wooden plaque in the Skills section.
export const skillGroups = [
  { name: "Languages", items: ["Python", "JavaScript", "TypeScript", "HTML", "CSS"] },
  { name: "Web", items: ["DOM & events", "localStorage", "Next.js", "Tailwind CSS", "Responsive design"] },
  { name: "Testing", items: ["unittest", "RED → FIX → GREEN", "Debugging", "Refactoring"] },
  { name: "AI", items: ["Gemini API", "Prompt engineering", "AI pair-programming"] },
  { name: "Tools", items: ["Git", "GitHub", "VS Code", "Vercel", "Chrome DevTools"] },
];

export const projects: ProjectCard[] = [
  {
    slug: "python-programs",
    title: "Python Programs Collection",
    about:
      "A little collection of Python classics: factorial done two ways, the Fibonacci series, and turning structures into dictionaries.",
    bullets: [
      "Factorial with a loop and with recursion",
      "Fibonacci series",
      "Dataclass, object, tuple list and records → dictionaries",
    ],
    tags: ["Python"],
    code: gh("project-4-"),
  },
  {
    slug: "messy-code",
    title: "Messy Python Code Improvement",
    about:
      "A messy student-marks script, tidied up with help from AI. Much easier to read, with exactly the same output.",
    bullets: [
      "Clear, meaningful names",
      "Marks are validated before use",
      "Built-in functions instead of manual loops",
      "A grade table replaces the long if-chain",
    ],
    tags: ["Python", "AI refactoring"],
    code: gh("project3"),
  },
  {
    slug: "bug-fixing",
    title: "Bug Fixing Using AI (student_utils)",
    about:
      "Nine unit tests found three sneaky bugs in student_utils. Each one was fixed with the RED → FIX → GREEN cycle.",
    bullets: [
      "Average divided by len − 1, now divides by len",
      "A mark of exactly 40 failed (> instead of >=)",
      "Distinction was unreachable because of the condition order",
      "4 failures + 1 error → 9/9 tests passing",
    ],
    tags: ["Python", "unittest"],
    code: gh("project1"),
  },
  {
    slug: "quiz",
    title: "Interactive Quiz Application",
    about: "A five-question multiple-choice quiz that tracks progress, locks answers and shows your score.",
    bullets: ["Progress through 5 questions", "One answer per question", "Final score + Play Again"],
    tags: ["HTML", "CSS", "JavaScript"],
    code: gh("project2"),
  },
  {
    slug: "reading-list",
    title: "Book Reading List Application",
    about:
      "A cosy reading tracker: Want to Read, Reading and Finished, with filters and counts, saved right in the browser.",
    bullets: [
      "Three statuses for every book",
      "Filter, change status or delete",
      "Summary counts for each status",
      "No duplicate titles, 60-character limit",
      "Saved in localStorage, live on Vercel",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Vercel"],
    code: gh("project-5"),
    demo: "https://reading-liist.vercel.app/",
  },
];

// Every technology used across the projects → the filter chips.
export const projectTags = [...new Set(projects.flatMap((p) => p.tags))];

// "The climb": Rounak's learning path drawn as stations up Mt Fuji.
export const climb = [
  { station: "Base", title: "Started B.Tech CSE", text: "Joined JECRC University, Jaipur (batch 2025)." },
  { station: "Station 1", title: "Python basics", text: "Loops vs. recursion, Fibonacci and dictionaries." },
  { station: "Station 2", title: "Clean code", text: "Refactored a messy marks script with AI help." },
  { station: "Station 3", title: "Testing", text: "Found 3 bugs with 9 unit tests: RED → FIX → GREEN." },
  {
    station: "Station 4",
    title: "The browser",
    text: "A quiz and a reading list in HTML, CSS and JavaScript.",
  },
  { station: "Summit", title: "Shipping", text: "Reading list live on Vercel, and this Next.js portfolio." },
];

export const chatStarters = [
  "Who is Rounak?",
  "What are Rounak's skills?",
  "Explain the Python programs",
  "Where is Rounak's GitHub?",
];

/** Builds the Gemini system prompt from the data above. */
export function chatbotInstructions(): string {
  const skillText = skillGroups.map((g) => `- ${g.name}: ${g.items.join(", ")}`).join("\n");
  const climbText = climb.map((c) => `- ${c.station}: ${c.title}. ${c.text}`).join("\n");
  const projectText = projects
    .map((p, i) =>
      [
        `${i + 1}. ${p.title}`,
        `   ${p.about}`,
        ...p.bullets.map((b) => `   - ${b}`),
        `   Technologies: ${p.tags.join(", ")}`,
        `   GitHub: ${p.code || "not added yet"}`,
        p.demo ? `   Live demo: ${p.demo}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");

  return `You are ${bot.name}, a calm, friendly assistant on ${rounak.name}'s portfolio website.
Answer visitors' questions about ${rounak.first}. When someone says "you", they mean ${rounak.first}.
Always refer to ${rounak.first} by name instead of using he/she pronouns.
Keep answers short and warm: 2-5 sentences, or a few "- " bullet points. Plain text only (no markdown headings, bold or code).

Rules:
- Use only the information below. Never invent projects, marks, dates, jobs or links.
- If something isn't covered, say you don't know and suggest emailing ${rounak.email}.
- If a link says "not added yet", say it hasn't been added to the site yet.
- Gently decline questions that have nothing to do with ${rounak.first}'s portfolio.

Profile:
- Name: ${rounak.name}
- Education: ${rounak.course}, ${rounak.college} (batch ${rounak.batch}, roll no. ${rounak.roll})
- Location: ${rounak.city}
- Email: ${rounak.email}
- GitHub: ${rounak.github || "not added yet"}
- LinkedIn: ${rounak.linkedin || "not added yet"}

About:
${rounak.intro}

Skills:
${skillText}

Projects (${projects.length}):
${projectText}

Learning path:
${climbText}`;
}
