"use client";

import { CONTACT } from "@/lib/content";
import { useLang } from "./LangProvider";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

function Title({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      {kicker && <div className="mb-3 text-xs font-semibold tracking-[0.25em] text-violet-300 uppercase">{kicker}</div>}
      <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">{title}</h2>
      {sub && <p className="mt-4 text-lg text-white/60">{sub}</p>}
    </Reveal>
  );
}

export function Work() {
  const { t } = useLang();
  return (
    <section id="projets" className="mx-auto max-w-6xl px-6 py-28">
      <Title title={t.work.title} sub={t.work.sub} />
      <div className="space-y-10">
        {t.projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}

export function Method() {
  const { t } = useLang();
  return (
    <section id="methode" className="mx-auto max-w-6xl px-6 py-28">
      <Title title={t.method.title} sub={t.method.sub} />
      <div className="grid gap-4 md:grid-cols-5">
        {t.method.steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <div className="glass group relative h-full overflow-hidden rounded-2xl p-6 transition hover:-translate-y-1 hover:bg-white/[0.07]">
              <div className="font-display text-5xl font-bold text-white/10 transition group-hover:text-violet-300/40">{s.n}</div>
              <h3 className="font-display mt-6 text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-24">
        <Title title={t.method.aiTitle} sub={t.method.aiSub} />
        <div className="grid gap-4 sm:grid-cols-2">
          {t.method.rules.map((r, i) => (
            <Reveal key={r.t} delay={i * 0.08}>
              <div className="glass flex h-full gap-4 rounded-2xl p-6">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-sky-500 font-display text-sm font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold">{r.t}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">{r.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Path() {
  const { t } = useLang();
  return (
    <section id="parcours" className="mx-auto max-w-4xl px-6 py-28">
      <Title title={t.path.title} />
      <div className="relative border-l border-white/15 pl-8">
        {t.path.items.map((it, i) => (
          <Reveal key={it.role} delay={i * 0.06} className="relative pb-12 last:pb-0">
            <span className="absolute -left-[39px] top-1.5 h-3 w-3 rounded-full bg-gradient-to-br from-violet-400 to-emerald-400 ring-4 ring-[#06070b]" />
            <div className="text-xs font-semibold tracking-widest text-violet-300 uppercase">{it.when}</div>
            <h3 className="font-display mt-1 text-2xl font-semibold">{it.role}</h3>
            <div className="text-sm text-white/50">{it.where}</div>
            <p className="mt-3 leading-relaxed text-white/70">{it.d}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  const { t } = useLang();
  const links = [
    CONTACT.github && ["GitHub", CONTACT.github],
    CONTACT.linkedin && ["LinkedIn", CONTACT.linkedin],
  ].filter(Boolean) as string[][];

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 pb-24 pt-28">
      <Reveal>
        <div className="glass glow-border relative overflow-hidden rounded-[2rem] p-10 text-center sm:p-16">
          <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,#7c5cff28,transparent)]" />
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">{t.contact.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/65">{t.contact.sub}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${CONTACT.email}`}
              className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:scale-105"
            >
              {t.contact.mail}
            </a>
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-full px-8 py-4 text-sm font-semibold transition hover:bg-white/10"
              >
                {label} ↗
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm text-white/45">
            {CONTACT.email} · {t.contact.location}
          </p>
        </div>
      </Reveal>
      <footer className="mt-12 text-center text-xs text-white/35">{t.footer}</footer>
    </section>
  );
}
