"use client";

import { motion } from "framer-motion";

/**
 * Section label styled as a code comment instead of the generic
 * uppercase/tracking-widest eyebrow every template reaches for. Sylcom
 * builds software — its own section headers can look like it.
 */
export default function Eyebrow({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <motion.span
      whileHover={{ x: 3 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`inline-flex items-baseline gap-2 font-mono text-sm text-accent ${className}`}
    >
      <span aria-hidden="true" className="text-accent-2/60">
        {"//"}
      </span>
      {children}
    </motion.span>
  );
}
