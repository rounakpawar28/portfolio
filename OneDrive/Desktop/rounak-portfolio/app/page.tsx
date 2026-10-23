import { TopBar } from "@/components/top-bar";
import { FujiHero } from "@/components/fuji-hero";
import { HangingScroll } from "@/components/hanging-scroll";
import { EmaSkills } from "@/components/ema-skills";
import { WashiWorks } from "@/components/washi-works";
import { TheClimb } from "@/components/the-climb";
import { DuskContact } from "@/components/dusk-contact";
import { HanaChat } from "@/components/hana-chat";

export default function Home() {
  return (
    <>
      <TopBar />
      <main className="relative">
        <FujiHero />
        <HangingScroll />
        <EmaSkills />
        <WashiWorks />
        <TheClimb />
        <DuskContact />
      </main>
      <HanaChat />
    </>
  );
}
