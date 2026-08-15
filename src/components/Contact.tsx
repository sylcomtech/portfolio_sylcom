"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Link001, Link002 } from "@/components/ui/skiper-ui/skiper40";
import { useFieldSync, type FieldStatus } from "@/hooks/useFieldSync";
import Eyebrow from "./Eyebrow";

const fadeUp = {
  hidden: { opacity: 0, y: 60, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 18 },
  },
} as const;

const contactInfo = [
  { icon: Mail, label: "sylcom84@gmail.com", href: "mailto:sylcom84@gmail.com", type: "link" as const },
  {
    icon: MessageCircle,
    label: "+55 (51) 9366-3115 (WhatsApp)",
    href: "https://wa.me/555193663115?text=" + encodeURIComponent("Olá! Vim pelo site da Sylcom e gostaria de saber mais."),
    type: "link" as const,
  },
  { icon: MapPin, label: "Atendimento em todo o Brasil", type: "text" as const },
];

function fieldVariant(fromLeft: boolean) {
  return {
    hidden: { opacity: 0, x: fromLeft ? -50 : 50, scale: 0.9 },
    show: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 220, damping: 18 },
    },
  } as const;
}

const STATUS_RING: Record<FieldStatus, string> = {
  idle: "0 0 0 0px rgba(0,0,0,0)",
  valid: "0 0 0 3px rgba(34,197,94,0.35)",
  invalid: "0 0 0 3px rgba(244,63,94,0.35)",
};

const SHAKE_KEYFRAMES = [0, -8, 8, -6, 6, -3, 3, 0];

type SyncFieldProps = {
  label: string;
  name: string;
  type?: string;
  multiline?: boolean;
  rows?: number;
  fromLeft: boolean;
  field: ReturnType<typeof useFieldSync>;
  className?: string;
};

function SyncField({ label, name, type = "text", multiline, rows, fromLeft, field, className }: SyncFieldProps) {
  const id = useId();
  const { value, status, onChange, onBlur } = field;
  const Comp = multiline ? motion.textarea : motion.input;

  return (
    <motion.div key={field.shakeKey} initial={{ x: 0 }} animate={{ x: field.shakeKey ? SHAKE_KEYFRAMES : 0 }}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <Comp
        id={id}
        name={name}
        variants={fieldVariant(fromLeft)}
        whileFocus={{ scale: multiline ? 1.02 : 1.03 }}
        animate={{ boxShadow: STATUS_RING[status] }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        required
        {...(multiline ? { rows: rows ?? 5 } : { type })}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={label}
        aria-invalid={status === "invalid"}
        className={
          className ??
          "rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
        }
      />
    </motion.div>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);

  const name = useFieldSync((v) => v.trim().length >= 2);
  const email = useFieldSync((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
  const message = useFieldSync((v) => v.trim().length >= 10);
  const allValid = name.valid && email.valid && message.valid;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nameOk = name.flagIfInvalid();
    const emailOk = email.flagIfInvalid();
    const messageOk = message.flagIfInvalid();
    if (nameOk && emailOk && messageOk) setSent(true);
  }

  return (
    <section id="contato" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <Eyebrow>contato</Eyebrow>
          <h2 className="mt-4 max-w-xl font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Vamos construir seu próximo site ou app?
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
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
            {contactInfo.map(({ icon: Icon, label, href, type }, i) => (
              <div key={label} className="group flex items-center gap-4">
                <motion.span
                  whileHover={{ scale: 1.25, rotate: -15 }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 },
                    default: { type: "spring", stiffness: 300, damping: 12 },
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-accent transition-colors group-hover:border-accent/50"
                >
                  <Icon size={18} />
                </motion.span>
                {type === "link" && href ? (
                  <Link001 href={href} className="text-muted-foreground hover:text-accent">
                    {label}
                  </Link001>
                ) : (
                  <span className="text-muted-foreground">{label}</span>
                )}
              </div>
            ))}

            <div className="pt-4">
              <Link002 href="https://sylcom.com.br" className="text-sm text-muted-foreground hover:text-accent">
                sylcom.com.br
              </Link002>
            </div>
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4 lg:col-span-3"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <SyncField label="Seu nome" name="name" fromLeft field={name} />
              <SyncField label="Seu e-mail" name="email" type="email" fromLeft={false} field={email} />
            </div>
            <SyncField label="Conte sobre o seu projeto" name="message" multiline fromLeft field={message} />
            <motion.button
              whileHover={{ scale: 1.08, rotate: -2 }}
              whileTap={{ scale: 0.92 }}
              animate={sent ? { scale: [1, 1.3, 0.95, 1.1, 1], rotate: [0, -5, 5, 0] } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 14 }}
              type="submit"
              className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background ${
                !sent && allValid ? "animate-pulse-ring" : ""
              }`}
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              <span className="relative">{sent ? "Mensagem enviada!" : "Enviar mensagem"}</span>
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    className="relative"
                  >
                    <Check size={16} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="send"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, x: [0, 3, 0] }}
                    exit={{ scale: 0 }}
                    transition={{ x: { duration: 1, repeat: Infinity, ease: "easeInOut" } }}
                    className="relative"
                  >
                    <Send size={16} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
