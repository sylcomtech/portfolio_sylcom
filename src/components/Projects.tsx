"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import Eyebrow from "./Eyebrow";

const categories = ["Todos", ...Array.from(new Set(projects.map((p) => p.category)))];
const categoryCounts: Record<string, number> = Object.fromEntries(
  categories.map((cat) => [cat, cat === "Todos" ? projects.length : projects.filter((p) => p.category === cat).length])
);

function CountBadge({ count, active }: { count: number; active: boolean }) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={count}
        aria-hidden="true"
        initial={{ scale: 0.5, opacity: 0, y: -6 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, opacity: 0, y: 6 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-semibold tabular-nums ${
          active ? "bg-background/20 text-background" : "bg-accent/15 text-accent"
        }`}
      >
        {count}
      </motion.span>
    </AnimatePresence>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 60, scale: 0.85, rotate: -2 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 200, damping: 16 },
  },
} as const;

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      variants={fadeUp}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -30, scale: 0.85, transition: { duration: 0.25 } }}
      whileHover={{ y: -14, scale: 1.03, rotate: -1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <a
        href={project.href ?? "#"}
        target={project.href ? "_blank" : undefined}
        rel={project.href ? "noopener noreferrer" : undefined}
        aria-label={`Visitar site: ${project.title}`}
        className={`relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient} ${
          project.href ? "cursor-pointer" : "cursor-default"
        }`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={`Captura de tela do site ${project.title}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-125 group-hover:rotate-1"
          />
        ) : (
          <motion.span
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.15, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 14 }}
            className="select-none text-4xl font-semibold text-white/90 drop-shadow-sm"
          >
            {project.title}
          </motion.span>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {project.href && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            whileHover={{ scale: 1.15 }}
            className="absolute right-4 top-4 rounded-full bg-black/25 p-2 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-hover:rotate-0"
          >
            <ArrowUpRight size={18} className="text-white" />
          </motion.div>
        )}
      </a>

      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{project.title}</h3>
          <span className="text-xs text-muted-foreground">{project.client}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.15, y: -2 }}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [active, setActive] = useState<string>("Todos");

  const filtered = useMemo(
    () => (active === "Todos" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="projetos" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <Eyebrow>portfólio</Eyebrow>
            <h2 className="mt-4 max-w-xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              {projects.length > 0
                ? "Alguns dos sites e apps que já construímos"
                : "Em breve, os primeiros projetos por aqui"}
            </h2>
          </div>
        </motion.div>

        {categories.length > 2 && (
          <div className="mt-10 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  active === cat ? "text-background" : "border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === cat && (
                  <motion.span
                    layoutId="activeCategoryPill"
                    transition={{ type: "spring", stiffness: 350, damping: 26 }}
                    className="absolute inset-0 rounded-full bg-foreground"
                  />
                )}
                <span className="relative inline-flex items-center gap-1.5">
                  {cat}
                  <CountBadge count={categoryCounts[cat]} active={active === cat} />
                </span>
              </motion.button>
            ))}
          </div>
        )}

        {filtered.length > 0 && (
          <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border/70 bg-surface/40 px-6 py-16 text-center sm:py-20"
          >
            <motion.span
              aria-hidden="true"
              animate={{ scale: [1, 1.12, 1], y: [0, -8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-mono text-lg font-bold text-accent"
            >
              {"{ }"}
            </motion.span>
            <p className="max-w-sm text-muted-foreground">
              Estamos com a agenda aberta para novos projetos. O seu pode ser o
              próximo case por aqui.
            </p>
            <motion.a
              href="#contato"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              Falar com a gente
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
