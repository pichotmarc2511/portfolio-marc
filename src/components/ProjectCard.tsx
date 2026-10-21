"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Counter } from "./Counter";
import { useLang } from "./LangProvider";
import type { Content } from "@/lib/content";

type P = Content["projects"][number];

export function ProjectCard({ p, index }: { p: P; index: number }) {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const flip = index % 2 === 1;
  const src = p.images[active] ?? p.images[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="glass-panel glow-border group relative grid gap-8 overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:grid-cols-2 lg:gap-12"
      style={{ ["--glow" as string]: p.accent }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-12 -z-10 opacity-40 transition-opacity duration-500 group-hover:opacity-60"
        style={{
          background: `radial-gradient(50% 50% at ${flip ? "25%" : "75%"} 35%, ${p.accent}33, transparent)`,
        }}
      />

      <div className={`${flip ? "lg:order-2" : ""} [perspective:900px]`}>
        <motion.div
          className="relative transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateX(4deg)_rotateY(-4deg)]"
        >
          <div
            className={`relative mx-auto overflow-hidden rounded-2xl border border-white/10 bg-black/40 ${
              p.phone ? "aspect-[9/19] max-w-[280px]" : "aspect-[16/10] w-full"
            }`}
            style={{ boxShadow: `0 24px 64px -24px ${p.accent}66` }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={src}
                  alt={`${p.name} ${active + 1}`}
                  fill
                  sizes="(min-width:1024px) 40vw, 90vw"
                  className={`object-cover ${p.phone ? "object-top" : ""}`}
                  priority={index === 0 && active === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          {p.images.length > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              {p.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`${p.name} ${i + 1}`}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{ width: i === active ? 32 : 10, background: i === active ? p.accent : "#ffffff30" }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="font-display text-sm font-medium tracking-widest uppercase" style={{ color: p.accent }}>
          0{index + 1}
        </div>
        <h3 className="font-display mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{p.name}</h3>
        <p className="mt-2 text-lg text-white/70">{p.tagline}</p>

        <div className="mt-6 text-xs font-semibold tracking-widest text-white/40 uppercase">{t.work.problem}</div>
        <p className="mt-1 leading-relaxed text-white/75">{p.problem}</p>

        <div className="mt-6 text-xs font-semibold tracking-widest text-white/40 uppercase">{t.work.did}</div>
        <ul className="mt-2 space-y-2 text-sm leading-relaxed text-white/75">
          {p.did.map((d) => (
            <li key={d} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.accent }} />
              {d}
            </li>
          ))}
        </ul>

        {p.events && (
          <div className="mt-6">
            <div className="text-xs font-semibold tracking-widest text-white/40 uppercase">{t.work.events}</div>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {p.events.map((ev) => (
                <div key={ev.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs font-semibold tracking-wide" style={{ color: p.accent }}>
                    {ev.when}
                  </div>
                  <div className="font-display mt-0.5 text-sm font-semibold">{ev.name}</div>
                  <p className="mt-1 text-xs leading-relaxed text-white/60">{ev.detail}</p>
                  {ev.images && (
                    <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                      {ev.images.map((imgSrc) => (
                        <a
                          key={imgSrc}
                          href={imgSrc}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative block h-28 shrink-0 overflow-hidden rounded-lg border border-white/10 transition hover:scale-[1.04]"
                          style={{
                            aspectRatio: imgSrc.includes("carte")
                              ? "3 / 2"
                              : imgSrc.includes("a3-pourquoi")
                                ? "2 / 3"
                                : imgSrc.includes("flyer")
                                  ? "4 / 5"
                                  : "2 / 3",
                          }}
                        >
                          <Image src={imgSrc} alt={ev.name} fill sizes="120px" className="object-cover" loading="lazy" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-6">
          {p.facts.map((f) => (
            <div key={f.label}>
              <div className="font-display text-3xl font-bold">
                <Counter to={f.value} suffix={f.suffix} />
              </div>
              <div className="text-xs text-white/50">{f.label}</div>
            </div>
          ))}
          {p.link && (
            <a
              href={p.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-105"
              style={{ background: p.accent }}
            >
              {t.work.open} <span aria-hidden>↗</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
