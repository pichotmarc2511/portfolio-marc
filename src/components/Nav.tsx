"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useLang } from "./LangProvider";

export function Nav() {
  const { t, lang, setLang } = useLang();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24 });

  const links = [
    ["#projets", t.nav.work],
    ["#methode", t.nav.method],
    ["#parcours", t.nav.path],
    ["#contact", t.nav.contact],
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="glass mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5">
        <a href="#top" className="font-display text-sm font-semibold tracking-tight">
          <span className="gradient-text">MP</span>
          <span className="text-white/60">.dev</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-white/70 md:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="transition hover:text-white">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1 rounded-full border border-white/10 p-0.5 text-xs">
          {(["fr", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`rounded-full px-3 py-1 font-medium uppercase transition ${
                lang === l ? "bg-white text-black" : "text-white/60 hover:text-white"
              }`}
              aria-pressed={lang === l}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <motion.div
        style={{ scaleX }}
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-400"
      />
    </header>
  );
}
