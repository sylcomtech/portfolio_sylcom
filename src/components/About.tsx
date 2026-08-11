"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

export default function About() {
  return (
    <section id="sobre" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="max-w-2xl"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-accent">
            Sobre a Sylcom
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Uma equipe de produto, design e engenharia dedicada ao seu negócio
          </h2>
          <p className="mt-6 text-lg text-muted">
            Somos uma software house focada em construir sites, aplicativos e
            sistemas que unem design cuidadoso e engenharia sólida. Trabalhamos
            lado a lado com cada cliente, do primeiro rascunho ao produto no ar —
            e continuamos evoluindo junto depois do lançamento.
          </p>
        </motion.div>

        <div id="servicos" className="mt-20 scroll-mt-24 border-t border-border pt-16">
          <motion.h3
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            O que fazemos
          </motion.h3>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.1 }}
            className="mt-10 grid gap-6 sm:grid-cols-2"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/50"
              >
                <h4 className="text-lg font-medium">{service.title}</h4>
                <p className="mt-2 text-sm text-muted">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
