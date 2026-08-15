"use client";

import { useEffect, useState, type PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useAnimationIntensity } from "@/hooks/useDeviceTier";

// Rotating badge copy. Timed like a Raft term: one "leader" tagline holds
// the floor for TAGLINE_TERM_MS before a clean handoff to the next — never
// two taglines visible/animating at once (AnimatePresence mode="wait").
const taglines = [
  "Sites e apps sob medida para o seu negócio",
  "Do planejamento ao lançamento, sem atrito",
  "E-commerces e sistemas que vendem por você",
  "Design, código e resultado na mesma equipe",
];
const TAGLINE_TERM_MS = 4000;

const taglineVariants = {
  enter: { opacity: 0, y: 10, filter: "blur(6px)" },
  center: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -10, filter: "blur(6px)" },
} as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 70, scale: 0.85, rotate: -2 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 220, damping: 16 },
  },
} as const;

// Kept snappy on purpose: the h1 is the page's LCP element. A real
// Lighthouse trace (chrome-devtools MCP) measured 2.4s LCP with 94% render
// delay traced directly to this stagger — long delayChildren + slow springs
// meant the largest headline word wasn't fully painted for over a second.
// This still reads as an entrance animation, just one that finishes fast.
const wordContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } },
};

const word = {
  hidden: { opacity: 0, y: 24, rotateX: -60, scale: 0.7, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 320, damping: 22 },
  },
} as const;

function Word({ children }: { children: string }) {
  return (
    <motion.span variants={word} className="inline-block will-change-transform">
      {children}&nbsp;
    </motion.span>
  );
}

// The signature: real syntax fragments instead of sparkle/star/rocket
// dingfonts. Sylcom builds software — its ambient decoration is drawn from
// its own material (code punctuation), not a generic icon set. Colors cycle
// through the brand's three-stop gradient so the set reads as one family.
const floaters = [
  { glyph: "</>", className: "left-[8%] top-[22%]", size: 26, duration: 4.5, color: "text-accent" },
  { glyph: "{ }", className: "right-[12%] top-[28%]", size: 22, duration: 5.5, color: "text-accent-2" },
  { glyph: "=>", className: "left-[18%] bottom-[18%]", size: 22, duration: 4, color: "text-accent-3" },
  { glyph: ";", className: "right-[16%] bottom-[26%]", size: 30, duration: 3.5, color: "text-accent" },
  { glyph: "#", className: "left-[42%] top-[14%]", size: 20, duration: 6, color: "text-accent-2" },
  { glyph: "[ ]", className: "right-[30%] bottom-[14%]", size: 18, duration: 5, color: "text-accent-3" },
];

export default function Hero() {
  const reduceMotion = useReducedMotion();
  // "low" = weak/low-memory device, motion still wanted but trimmed (fewer
  // floaters, no blob morph keyframe — the blur filter itself is cheap,
  // it's animating it every frame on an integrated GPU that isn't).
  const intensity = useAnimationIntensity();
  const lowTier = intensity === "low";
  const visibleFloaters = lowTier ? floaters.slice(0, 2) : floaters;

  const [taglineIndex, setTaglineIndex] = useState(0);
  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      if (document.visibilityState === "hidden") return;
      setTaglineIndex((i) => (i + 1) % taglines.length);
    }, TAGLINE_TERM_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 40, damping: 10, mass: 0.7 };
  const blob1X = useSpring(useTransform(px, [-1, 1], [-70, 70]), spring);
  const blob1Y = useSpring(useTransform(py, [-1, 1], [-70, 70]), spring);
  const blob2X = useSpring(useTransform(px, [-1, 1], [55, -55]), spring);
  const blob2Y = useSpring(useTransform(py, [-1, 1], [70, -70]), spring);
  const blob3X = useSpring(useTransform(px, [-1, 1], [-50, 50]), spring);
  const blob3Y = useSpring(useTransform(py, [-1, 1], [-50, 50]), spring);

  function handlePointerMove(e: PointerEvent<HTMLElement>) {
    if (reduceMotion || e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    py.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  function handlePointerLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <section
      id="top"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex min-h-dvh items-center overflow-hidden pt-24"
    >
      <div className="pointer-events-none absolute inset-0 grid-overlay" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={reduceMotion ? undefined : { x: blob1X, y: blob1Y }}
          className={`absolute -left-32 top-10 h-72 w-72 rounded-full bg-accent/40 blur-3xl sm:h-96 sm:w-96 ${lowTier ? "" : "animate-blob"}`}
        />
        <motion.div
          style={reduceMotion ? undefined : { x: blob2X, y: blob2Y }}
          className={`animation-delay-2000 absolute right-0 top-40 h-72 w-72 rounded-full bg-accent-2/35 blur-3xl sm:h-96 sm:w-96 ${lowTier ? "" : "animate-blob"}`}
        />
        <motion.div
          style={reduceMotion ? undefined : { x: blob3X, y: blob3Y }}
          className={`animation-delay-4000 absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent-3/30 blur-3xl sm:h-96 sm:w-96 ${lowTier ? "" : "animate-blob"}`}
        />

        {!reduceMotion &&
          visibleFloaters.map(({ glyph, className, size, duration, color }, i) => (
            <motion.div
              key={i}
              aria-hidden="true"
              animate={{
                y: [0, -36, 0, 36, 0],
                x: [0, 14, 0, -14, 0],
                rotate: [0, 12, 0, -12, 0],
                opacity: [0.25, 0.7, 0.25],
              }}
              transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontSize: size }}
              className={`absolute hidden select-none font-mono font-bold sm:block ${color} ${className}`}
            >
              {glyph}
            </motion.div>
          ))}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex max-w-6xl flex-col items-start px-6"
      >
        <motion.span
          variants={item}
          layout
          whileHover={{ scale: 1.04 }}
          aria-label={taglines[0]}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-sm text-muted-foreground"
        >
          <span aria-hidden="true" className="text-accent-2">
            $
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={taglineIndex}
              aria-hidden="true"
              variants={taglineVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {taglines[taglineIndex]}
            </motion.span>
          </AnimatePresence>
          <span aria-hidden="true" className="animate-caret inline-block h-3.5 w-[7px] bg-accent" />
        </motion.span>

        <motion.h1
          variants={wordContainer}
          initial="hidden"
          animate="show"
          style={{ perspective: 600 }}
          className="max-w-3xl font-heading text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl"
        >
          <Word>Transformamos</Word>
          <Word>ideias</Word>
          <Word>em</Word>
          <motion.span
            variants={word}
            animate={{
              backgroundPosition: ["0% center", "100% center", "0% center"],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="text-gradient inline-block"
          >
            produtos digitais
          </motion.span>{" "}
          <Word>que</Word>
          <Word>geram</Word>
          <Word>resultado</Word>
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-xl text-lg text-muted-foreground">
          A Sylcom desenvolve sites, e-commerces, apps e sistemas sob medida para
          empresas que querem crescer no digital, do planejamento ao lançamento.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <motion.a
            href="#projetos"
            whileHover={{ scale: 1.12, rotate: -3 }}
            whileTap={{ scale: 0.9, rotate: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className="animate-pulse-ring group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            <span className="relative">Ver projetos</span>
            <motion.span
              className="relative flex"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </motion.a>
          <motion.a
            href="#contato"
            whileHover={{ scale: 1.1, rotate: 3 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_32px_-4px_var(--accent)]"
          >
            Falar com a gente
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#sobre"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.3 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted-foreground sm:block"
        aria-label="Rolar para baixo"
      >
        <motion.span
          animate={reduceMotion ? undefined : { y: [0, 14, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          className="flex"
        >
          <ArrowDown size={20} />
        </motion.span>
      </motion.a>
    </section>
  );
}
