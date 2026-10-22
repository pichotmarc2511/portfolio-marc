"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { Counter } from "./Counter";
import { useLang } from "./LangProvider";
import type { Content } from "@/lib/content";

type P = Content["projects"][number];

function EventThumb({ imgSrc, name, compact }: { imgSrc: string; name: string; compact?: boolean }) {
  const tall = imgSrc.includes("flyer") || imgSrc.includes("a3");
  const maxH = compact ? "max-h-[72px]" : tall ? "max-h-[200px] sm:max-h-[220px]" : "max-h-[88px] sm:max-h-[96px]";
  return (
    <a
      href={imgSrc}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-black/25 p-1 transition hover:border-white/25"
    >
      <img src={imgSrc} alt={name} loading="lazy" className={`h-auto w-full ${maxH} object-contain`} />
    </a>
  );
}

function EventPhotos({ images, name }: { images: string[]; name: string }) {
  const cartes = images.filter((src) => src.includes("carte"));
  const posters = images.filter((src) => !src.includes("carte"));

  if (cartes.length > 0 && posters.length > 0) {
    return (
      <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex w-[7.25rem] shrink-0 flex-col gap-2">
          {cartes.map((imgSrc) => (
            <EventThumb key={imgSrc} imgSrc={imgSrc} name={name} compact />
          ))}
        </div>
        <div className="grid min-w-0 flex-1 grid-cols-2 gap-2 sm:grid-cols-3">
          {posters.map((imgSrc) => (
            <EventThumb key={imgSrc} imgSrc={imgSrc} name={name} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid w-full min-w-0 grid-cols-2 gap-3">
      {images.map((imgSrc) => (
        <EventThumb key={imgSrc} imgSrc={imgSrc} name={name} />
      ))}
    </div>
  );
}

function EventBlock({ ev, accent, t }: { ev: NonNullable<P["events"]>[number]; accent: string; t: Content["work"] }) {
  return (
    <>
      <div className="text-xs font-semibold tracking-wide" style={{ color: accent }}>
        {ev.when}
      </div>
      <div className="font-display mt-0.5 text-sm font-semibold leading-snug">{ev.name}</div>
      <p className="mt-1 text-xs leading-relaxed text-white/60">{ev.detail}</p>
      {ev.images && (
        <div className="mt-3 min-w-0">
          <EventPhotos images={ev.images} name={ev.name} />
        </div>
      )}
    </>
  );
}

export function ProjectCard({ p, index }: { p: P; index: number }) {
  const { t } = useLang();
  const panelId = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);
  const flip = index % 2 === 1;
  const [tilt3d, setTilt3d] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const sync = () => setTilt3d(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!tilt3d || !open) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass glow-border relative w-full min-w-0 max-w-full overflow-hidden rounded-[2rem]"
      style={{ ["--glow" as string]: p.accent }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-20 -z-10 opacity-30 blur-3xl"
        style={{ background: `radial-gradient(40% 40% at ${flip ? "20%" : "80%"} 30%, ${p.accent}55, transparent)` }}
      />

      {!open ? (
        <button
          type="button"
          aria-expanded={false}
          aria-controls={panelId}
          onClick={() => setOpen(true)}
          className="flex w-full min-w-0 flex-wrap gap-4 p-5 text-left transition hover:bg-white/[0.03] sm:flex-nowrap sm:items-center sm:gap-6 sm:p-6"
        >
          <div
            className={`relative shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/40 ${
              p.phone ? "h-[88px] w-[44px]" : "h-[72px] w-[112px]"
            }`}
          >
            <Image src={p.images[0]} alt="" fill sizes="112px" className={`object-cover ${p.phone ? "object-top" : ""}`} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-display text-xs font-medium tracking-widest uppercase" style={{ color: p.accent }}>
              0{index + 1}
            </div>
            <h3 className="font-display mt-1 break-words text-xl font-bold tracking-tight sm:text-2xl">{p.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-white/65">{p.tagline}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.stack.slice(0, 5).map((s) => (
                <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/70">
                  {s}
                </span>
              ))}
              {p.stack.length > 5 && (
                <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/45">
                  +{p.stack.length - 5}
                </span>
              )}
            </div>
          </div>
          <span
            className="w-full shrink-0 rounded-full border border-white/15 px-4 py-2 text-center text-xs font-semibold text-white/80 sm:w-auto sm:text-left"
            style={{ borderColor: `${p.accent}55` }}
          >
            {t.work.expand}
          </span>
        </button>
      ) : (
        <>
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3 sm:px-8">
            <div className="font-display text-sm font-semibold" style={{ color: p.accent }}>
              0{index + 1} · {p.name}
            </div>
            <button
              type="button"
              aria-expanded
              aria-controls={panelId}
              onClick={() => setOpen(false)}
              className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/75 transition hover:bg-white/10"
            >
              {t.work.collapse}
            </button>
          </div>

          <div id={panelId} className="grid gap-8 p-4 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
            <div className={`min-w-0 overflow-hidden ${flip ? "lg:order-2" : ""} [perspective:1200px]`}>
              <motion.div
                onPointerMove={onMove}
                onPointerLeave={onLeave}
                style={tilt3d ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
                className="relative max-w-full"
              >
                <div
                  className={`relative mx-auto overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl ${
                    p.phone ? "aspect-[9/19] max-w-[280px]" : "aspect-[16/10] w-full"
                  }`}
                  style={{ boxShadow: `0 30px 80px -20px ${p.accent}55` }}
                >
                  {p.images.map((src, i) => (
                    <Image
                      key={src}
                      src={src}
                      alt={`${p.name} ${i + 1}`}
                      fill
                      sizes="(min-width:1024px) 40vw, 90vw"
                      className={`object-cover transition-all duration-700 ${
                        i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
                      } ${p.phone ? "object-top" : ""}`}
                      priority={index === 0 && i === 0}
                    />
                  ))}
                </div>
                {p.images.length > 1 && (
                  <div className="mt-4 flex justify-center gap-2">
                    {p.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        aria-label={`${p.name} ${i + 1}`}
                        className="h-1.5 rounded-full transition-all"
                        style={{ width: i === active ? 32 : 10, background: i === active ? p.accent : "#ffffff30" }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            <div className="flex min-w-0 flex-col justify-center">
              <p className="break-words text-lg text-white/70">{p.tagline}</p>

              <div className="mt-6 text-xs font-semibold tracking-widest text-white/40 uppercase">{t.work.problem}</div>
              <p className="mt-1 break-words leading-relaxed text-white/75">{p.problem}</p>

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
                <div className="mt-6 w-full min-w-0">
                  <div className="text-xs font-semibold tracking-widest text-white/40 uppercase">{t.work.events}</div>
                  <ul className="mt-3 space-y-3">
                    {p.events.map((ev) => (
                      <li key={ev.name} className="min-w-0">
                        <details className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 open:pb-0 sm:hidden">
                          <summary className="cursor-pointer list-none p-4 [&::-webkit-details-marker]:hidden">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <div className="text-xs font-semibold tracking-wide" style={{ color: p.accent }}>
                                  {ev.when}
                                </div>
                                <div className="font-display mt-0.5 text-sm font-semibold leading-snug">{ev.name}</div>
                              </div>
                              {ev.images && (
                                <span className="shrink-0 rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-white/55">
                                  {ev.images.length} {t.work.eventPhotos}
                                </span>
                              )}
                            </div>
                            <p className="mt-2 text-xs leading-relaxed text-white/60">{ev.detail}</p>
                          </summary>
                          <div className="border-t border-white/10 px-4 pb-4 pt-3">
                            {ev.images && <EventPhotos images={ev.images} name={ev.name} />}
                          </div>
                        </details>

                        <div className="hidden overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 sm:block">
                          <EventBlock ev={ev} accent={p.accent} t={t.work} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex min-w-0 flex-wrap items-center gap-4 sm:gap-6">
                {p.facts.map((f) => (
                  <div key={f.label} className="min-w-[5.5rem]">
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
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-black shadow-md transition hover:brightness-110 hover:shadow-lg active:scale-[0.98] sm:ml-auto sm:w-auto"
                    style={{ background: p.accent }}
                  >
                    {t.work.open} <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </motion.article>
  );
}
