"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";
import TiltCard from "./TiltCard";
import Eyebrow from "./Eyebrow";

const fadeUp = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 18 },
  },
} as const;

const cardGrid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

function cardVariant(index: number) {
  const fromLeft = index % 2 === 0;
  return {
    hidden: { opacity: 0, x: fromLeft ? -80 : 80, rotate: fromLeft ? -8 : 8, scale: 0.85 },
    show: {
      opacity: 1,
      x: 0,
      rotate: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 180, damping: 16 },
    },
  } as const;
}

export default function About() {
  return (
    <section id="sobre" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <Eyebrow>sobre a sylcom</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Uma equipe de produto, design e engenharia dedicada ao seu negócio
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Somos uma software house focada em construir sites, aplicativos e
            sistemas que unem design cuidadoso e engenharia sólida. Trabalhamos
            lado a lado com cada cliente, do primeiro rascunho ao produto no ar,
            e continuamos evoluindo junto depois do lançamento.
          </p>
        </motion.div>

        <div id="servicos" className="mt-16 scroll-mt-24 border-t border-border pt-14 sm:mt-20 sm:pt-16">
          <motion.h3
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="font-heading text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            O que fazemos
          </motion.h3>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={cardGrid}
            className="mt-10 grid gap-6 sm:grid-cols-2"
          >
            {services.map((service, index) => (
              <motion.div key={service.title} variants={cardVariant(index)}>
                <TiltCard className="h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50">
                  <motion.span
                    whileHover={{ rotate: 25, scale: 1.25 }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      y: { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 },
                      rotate: { type: "spring", stiffness: 300, damping: 12 },
                      scale: { type: "spring", stiffness: 300, damping: 12 },
                    }}
                    className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent"
                  >
                    <service.icon size={22} />
                  </motion.span>
                  <h4 className="relative mt-4 text-lg font-medium">{service.title}</h4>
                  <p className="relative mt-2 text-sm text-muted-foreground">{service.description}</p>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
