import { Globe, ShoppingCart, Smartphone, Settings, type LucideIcon } from "lucide-react";

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: "Site institucional" | "E-commerce" | "App mobile" | "Sistema web";
  description: string;
  tags: string[];
  gradient: string;
  image?: string;
  href?: string;
};

export const projects: Project[] = [];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** Path under /public, e.g. "/team/ana.jpg". Omitted -> initials avatar. */
  photo?: string;
};

// 3 of 4 are still placeholder ("Integrante N") until the real info comes
// in — intentionally generic rather than invented, so nobody mistakes them
// for real team members before they're swapped out.
export const team: TeamMember[] = [
  {
    name: "Luan Comelli",
    role: "CTO",
    bio: "Desenvolvedor, graduado em Informática Biomédica.",
    photo: "/team/luan-comelli.jpg",
  },
  { name: "Integrante 2", role: "Cargo", bio: "Uma frase curta sobre a especialidade dessa pessoa." },
  { name: "Integrante 3", role: "Cargo", bio: "Uma frase curta sobre a especialidade dessa pessoa." },
  { name: "Integrante 4", role: "Cargo", bio: "Uma frase curta sobre a especialidade dessa pessoa." },
];

export const services: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Sites institucionais",
    description: "Sites rápidos, responsivos e otimizados para SEO que representam sua marca.",
    icon: Globe,
  },
  {
    title: "E-commerce",
    description: "Lojas virtuais completas, do catálogo ao checkout, prontas para vender.",
    icon: ShoppingCart,
  },
  {
    title: "Aplicativos mobile",
    description: "Apps iOS e Android nativos ou híbridos, do MVP ao lançamento nas lojas.",
    icon: Smartphone,
  },
  {
    title: "Sistemas sob medida",
    description: "Plataformas e ferramentas internas para automatizar processos do seu negócio.",
    icon: Settings,
  },
];
