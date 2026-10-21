"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { BlurIn } from "./BlurIn";
import { Counter } from "./Counter";
import { useLang } from "./LangProvider";
import { STACK } from "@/lib/content";

function useTypewriter(words: string[]) {
  const [text, setText] = useState("");
  useEffect(() => {
    let w = 0;
    let i = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    setText("");
    const tick = () => {
      const word = words[w % words.length];
      if (!deleting) {
        i++;
        setText(word.slice(0, i));
        if (i === word.length) {
          deleting = true;
          timer = setTimeout(tick, 1700);
          return;
        }
        timer = setTimeout(tick, 70);
      } else {
        i--;
        setText(word.slice(0, i));
        if (i === 0) {
          deleting = false;
          w++;
        }
        timer = setTimeout(tick, 35);
      }
    };
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [words]);
  return text;
}

export function Hero() {
  const { t } = useLang();
  const typed = useTypewriter(t.hero.words);
  const doubled = [...STACK, ...STACK];
  const titleParts = t.hero.title.split(/(?<=\.)\s+/);

  return (
    <section id="top" className="section-block relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 pb-16 pt-32">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-panel mb-8 inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs text-white/80"
      >
        <span className="status-dot" aria-hidden>
          <i />
        </span>
        {t.hero.badge}
      </motion.div>

      <BlurIn delay={0.12} className="font-display block text-lg text-white/60">
        {t.hero.hello}
      </BlurIn>

      <h1 className="font-display mt-2 text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">
        {titleParts.map((part, i) => (
          <BlurIn key={part} delay={0.22 + i * 0.12} className="block">
            {part}
          </BlurIn>
        ))}
        <BlurIn delay={0.48} className="gradient-text caret mt-1 block">
          {typed || "\u00A0"}
        </BlurIn>
      </h1>

      <BlurIn delay={0.55} className="mt-8 block max-w-2xl text-lg leading-relaxed text-white/65">
        {t.hero.sub}
      </BlurIn>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65 }}
        className="mt-10 flex flex-wrap gap-4"
      >
        <a
          href="#projets"
          className="group relative overflow-hidden rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:scale-[1.03]"
        >
          <span className="relative z-10">{t.hero.cta1}</span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-300 via-sky-300 to-emerald-300 transition-transform duration-500 group-hover:translate-x-0" />
        </a>
        <a
          href="#contact"
          className="glass-panel rounded-full px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          {t.hero.cta2}
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.78 }}
        className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        {t.stats.map((s) => (
          <div key={s.label} className="glass-panel rounded-2xl p-5">
            <div className="font-display text-4xl font-bold tracking-tight">
              <Counter to={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-1 text-sm text-white/55">{s.label}</div>
          </div>
        ))}
      </motion.div>

      <div className="mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="marquee gap-3">
          {doubled.map((s, i) => (
            <span key={i} className="glass-panel mx-1.5 whitespace-nowrap rounded-full px-5 py-2 text-sm text-white/75">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
