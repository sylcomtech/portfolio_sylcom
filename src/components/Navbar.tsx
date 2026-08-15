"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useActiveSection } from "@/hooks/useActiveSection";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#equipe", label: "Equipe" },
  { href: "#projetos", label: "Projetos" },
  { href: "#contato", label: "Contato" },
];
const sectionIds = links.map((l) => l.href.slice(1));

const mobileList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const mobileItem = {
  hidden: { opacity: 0, x: -40, scale: 0.9 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 18 },
  },
} as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { active, setActiveOptimistic } = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.15, rotate: -6 }}
            whileTap={{ scale: 0.85, rotate: 6 }}
            transition={{ type: "spring", stiffness: 400, damping: 12 }}
          >
            <Image
              src="/brand/logo-mark.svg"
              alt="Sylcom"
              width={137}
              height={40}
              priority
              className="h-8 w-auto sm:h-9"
            />
          </motion.div>
        </a>

        <ul className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {links.map((link) => {
            const id = link.href.slice(1);
            const isActive = active === id;
            return (
              <li key={link.href}>
                <motion.a
                  href={link.href}
                  onClick={() => setActiveOptimistic(id)}
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative inline-block pb-1 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full ${
                    isActive ? "text-foreground" : "hover:text-accent"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeSectionIndicator"
                      transition={{ type: "spring", stiffness: 350, damping: 26 }}
                      className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-accent"
                    />
                  )}
                </motion.a>
              </li>
            );
          })}
        </ul>

        <motion.a
          href="#contato"
          whileHover={{ scale: 1.08, rotate: 2 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 12 }}
          className="hidden rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent hover:shadow-[0_0_24px_-6px_var(--accent)] md:inline-block"
        >
          Iniciar projeto
        </motion.a>

        <motion.button
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          whileTap={{ scale: 0.8 }}
          className="relative text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="flex"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-lg md:hidden"
          >
            <motion.ul
              variants={mobileList}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-1 px-6 py-4"
            >
              {links.map((link) => (
                <motion.li key={link.href} variants={mobileItem}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-base text-muted-foreground transition-colors hover:translate-x-2 hover:text-accent"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li variants={mobileItem} className="pt-2">
                <a
                  href="#contato"
                  onClick={() => setOpen(false)}
                  className="inline-block rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium"
                >
                  Iniciar projeto
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
