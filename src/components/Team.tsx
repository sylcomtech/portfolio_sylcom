"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { team, type TeamMember } from "@/lib/data";
import Eyebrow from "./Eyebrow";

const PEOPLE_PER_PAGE = 2;
const pageCount = Math.ceil(team.length / PEOPLE_PER_PAGE);
const DRAG_THRESHOLD = 80;

const fadeUp = {
  hidden: { opacity: 0, y: 60, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 18 },
  },
} as const;

// Direction-aware slide: which side a pair enters/exits from depends on
// whether you're going forward or back, not a fixed left/right.
const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0, scale: 0.94 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -80 : 80, opacity: 0, scale: 0.94 }),
} as const;

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function PersonCard({ person }: { person: TeamMember }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-4 text-center">
      <motion.div
        whileHover={{ scale: 1.05, rotate: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        className="rounded-full bg-gradient-to-br from-accent via-accent-2 to-accent-3 p-[3px]"
      >
        <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-background sm:h-40 sm:w-40">
          {person.photo ? (
            <Image
              src={person.photo}
              alt={person.name}
              width={160}
              height={160}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="font-heading text-3xl font-semibold text-accent">
              {initials(person.name)}
            </span>
          )}
        </div>
      </motion.div>
      <div>
        <h3 className="font-heading text-lg font-semibold">{person.name}</h3>
        <p className="font-mono text-xs text-accent-2">{person.role}</p>
        <p className="mt-2 max-w-[22ch] text-sm text-muted-foreground">{person.bio}</p>
      </div>
    </div>
  );
}

export default function Team() {
  const [[page, direction], setPage] = useState([0, 0]);

  function paginate(newDirection: number) {
    setPage(([p]) => {
      const next = (p + newDirection + pageCount) % pageCount;
      return [next, newDirection];
    });
  }

  function handleDragEnd(_e: unknown, info: PanInfo) {
    if (info.offset.x < -DRAG_THRESHOLD) paginate(1);
    else if (info.offset.x > DRAG_THRESHOLD) paginate(-1);
  }

  const pair = team.slice(page * PEOPLE_PER_PAGE, page * PEOPLE_PER_PAGE + PEOPLE_PER_PAGE);

  if (team.length === 0) return null;

  return (
    <section id="equipe" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <Eyebrow>quem somos</Eyebrow>
          <h2 className="mt-4 max-w-xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            As pessoas por trás da Sylcom
          </h2>
        </motion.div>

        <div className="relative mt-14">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                drag={pageCount > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="flex cursor-grab flex-col gap-10 px-2 py-2 active:cursor-grabbing sm:flex-row sm:justify-center sm:gap-16"
              >
                {pair.map((person) => (
                  <PersonCard key={person.name} person={person} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {pageCount > 1 && (
            <div className="mt-10 flex items-center justify-center gap-6">
              <motion.button
                type="button"
                aria-label="Ver pessoas anteriores"
                onClick={() => paginate(-1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowLeft size={18} />
              </motion.button>

              <div className="flex items-center gap-2">
                {Array.from({ length: pageCount }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Ver dupla ${i + 1}`}
                    aria-current={i === page}
                    onClick={() => setPage([i, i > page ? 1 : -1])}
                    className="relative flex h-4 w-4 items-center justify-center"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-border" />
                    {i === page && (
                      <motion.span
                        layoutId="teamPageDot"
                        transition={{ type: "spring", stiffness: 400, damping: 26 }}
                        className="absolute h-2.5 w-2.5 rounded-full bg-accent"
                      />
                    )}
                  </button>
                ))}
              </div>

              <motion.button
                type="button"
                aria-label="Ver próximas pessoas"
                onClick={() => paginate(1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowRight size={18} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
