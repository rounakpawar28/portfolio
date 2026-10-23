import type { Metadata, Viewport } from "next";
import { Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import { MotionProvider } from "@/components/motion-provider";
import { SakuraPetals } from "@/components/sakura-petals";
import { rounak } from "@/lib/data";
import { themeScript } from "@/lib/theme";
import "./globals.css";

const mincho = Shippori_Mincho({
  variable: "--font-mincho",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
});
const zen = Zen_Kaku_Gothic_New({
  variable: "--font-zen",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: `${rounak.name} · 桜 Portfolio`,
  description: `${rounak.name}, ${rounak.course} student at ${rounak.college}.`,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f1226" },
    { media: "(prefers-color-scheme: light)", color: "#fdf3f1" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${mincho.variable} ${zen.variable} dark antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen font-sans">
        <MotionProvider>
          <SakuraPetals />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
