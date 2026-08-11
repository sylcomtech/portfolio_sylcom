"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const contactInfo = [
  { icon: Mail, label: "contato@sylcom.com.br" },
  { icon: Phone, label: "+55 (00) 00000-0000" },
  { icon: MapPin, label: "Atendimento em todo o Brasil" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contato" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <span className="text-sm font-medium uppercase tracking-widest text-accent">
            Contato
          </span>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Vamos construir seu próximo site ou app?
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Conte um pouco sobre o seu projeto e retornamos com uma proposta.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-12 lg:grid-cols-5">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="space-y-6 lg:col-span-2"
          >
            {contactInfo.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-accent">
                  <Icon size={18} />
                </span>
                <span className="text-muted">{label}</span>
              </div>
            ))}
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="space-y-4 lg:col-span-3"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                required
                type="text"
                placeholder="Seu nome"
                className="rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
              />
              <input
                required
                type="email"
                placeholder="Seu e-mail"
                className="rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
              />
            </div>
            <textarea
              required
              rows={5}
              placeholder="Conte sobre o seu projeto"
              className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
            >
              {sent ? "Mensagem enviada!" : "Enviar mensagem"}
              <Send size={16} />
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
