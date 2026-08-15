"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

const reveal = fadeUp({ y: 40, scale: 0.9 });

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={reveal}
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-center text-sm text-muted-foreground sm:flex-row sm:text-left"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.15 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Image
              src="/brand/logo-mark.svg"
              alt="Sylcom"
              width={103}
              height={30}
              className="h-6 w-auto"
            />
          </motion.div>
          <span>Sites e apps sob medida</span>
        </div>
        <span>© {new Date().getFullYear()} Sylcom. Todos os direitos reservados.</span>
      </motion.div>
    </footer>
  );
}
