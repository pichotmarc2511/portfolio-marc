import { Background } from "@/components/Background";
import { Hero } from "@/components/Hero";
import { LangProvider } from "@/components/LangProvider";
import { Nav } from "@/components/Nav";
import { Contact, Method, Path, Work } from "@/components/Sections";

export default function Home() {
  return (
    <LangProvider>
      <Background />
      <Nav />
      <main>
        <Hero />
        <Work />
        <Method />
        <Path />
        <Contact />
      </main>
    </LangProvider>
  );
}
