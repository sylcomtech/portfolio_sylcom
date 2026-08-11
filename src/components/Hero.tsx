"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div className="pointer-events-none absolute inset-0 grid-overlay" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-blob absolute -left-32 top-10 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
        <div className="animate-blob animation-delay-2000 absolute right-0 top-40 h-96 w-96 rounded-full bg-accent-2/25 blur-3xl" />
        <div className="animate-blob animation-delay-4000 absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-accent-3/20 blur-3xl" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex max-w-6xl flex-col items-start px-6"
      >
        <motion.span
          variants={item}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted"
        >
          <Sparkles size={14} className="text-accent" />
          Sites e apps sob medida para o seu negócio
        </motion.span>

        <motion.h1
          variants={item}
          className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        >
          Transformamos ideias em{" "}
          <span className="text-gradient">produtos digitais</span> que geram resultado
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-xl text-lg text-muted">
          A Sylcom desenvolve sites, e-commerces, apps e sistemas sob medida para
          empresas que querem crescer no digital — do planejamento ao lançamento.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projetos"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-105"
          >
            Ver projetos
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contato"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
          >
            Falar com a gente
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-20 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm text-muted"
        >
          {["Next.js", "React Native", "Node.js", "UI/UX Design"].map((t) => (
            <span key={t} className="tracking-wide">
              {t}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#sobre"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted"
        aria-label="Rolar para baixo"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex"
        >
          <ArrowDown size={20} />
        </motion.span>
      </motion.a>
    </section>
  );
}
