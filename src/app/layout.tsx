import type { Metadata } from "next";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";

// Deliberately not Geist — it's the default of every Next.js/v0 scaffold,
// which is exactly the "templated" look this pass is trying to move away
// from. Space Grotesk (display) carries a geometric, technical edge for
// headings; Manrope (body) keeps paragraphs warm and readable against it;
// JetBrains Mono is the "software house" register — code-comment eyebrows,
// the Hero's terminal-prompt badge, floating syntax fragments.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-code",
  subsets: ["latin"],
});

const title = "Sylcom | Sites e apps sob medida";
const description =
  "A Sylcom desenvolve sites, e-commerces, aplicativos e sistemas sob medida para empresas que querem crescer no digital.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      // Dark is the site's permanent theme (not a toggle) — the ".dark"
      // tokens in globals.css are always active, not gated behind a class
      // switch. Hardcoded here instead of via prefers-color-scheme so a
      // visitor on a light-mode OS still sees the intended dark brand look.
      className={`dark ${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {/* reducedMotion="user" makes every Framer Motion animation in the
            tree obey prefers-reduced-motion automatically, without every
            component having to call useReducedMotion() itself. Components
            that already branch on useReducedMotion() (Hero, TiltCard) keep
            doing so for their imperative motion values (useSpring/useMotionValue
            aren't covered by this config), so this is additive, not redundant. */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
