"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/data";

const categories = ["Todos", ...Array.from(new Set(projects.map((p) => p.category)))];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as const;

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      variants={fadeUp}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div
        className={`relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br ${project.gradient}`}
      >
        <motion.div
          className="absolute inset-0 bg-black/10"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 0 }}
        />
        <motion.span
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
          className="select-none text-4xl font-semibold text-white/90 drop-shadow-sm"
        >
          {project.title}
        </motion.span>

        <div className="absolute right-4 top-4 rounded-full bg-black/25 p-2 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <ArrowUpRight size={18} className="text-white" />
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">{project.title}</h3>
          <span className="text-xs text-muted">{project.client}</span>
        </div>
        <p className="mt-2 text-sm text-muted">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-xs text-muted"
            >
              {tag}
            </span>
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
    <section id="projetos" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <span className="text-sm font-medium uppercase tracking-widest text-accent">
              Portfólio
            </span>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Alguns dos sites e apps que já construímos
            </h2>
          </div>
        </motion.div>

        <div className="mt-10 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                active === cat
                  ? "bg-foreground text-background"
                  : "border border-border text-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
