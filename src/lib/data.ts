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

// Roles are in English by request. Luis Henrique's bio was explicitly
// left to Claude's judgment ("pode inventar") — everyone else's bio is
// what was actually provided, not invented.
export const team: TeamMember[] = [
  {
    name: "Luan Comelli",
    role: "CTO",
    bio: "Desenvolvedor, graduado em Informática Biomédica.",
    photo: "/team/luan-comelli.jpg",
  },
  {
    name: "Tomas Volker",
    role: "Developer",
    bio: "Técnico em Desenvolvimento Web e Mobile.",
    photo: "/team/tomas-volker.png",
  },
  {
    name: "Alisson Pinheiro",
    role: "Developer",
    bio: "Full stack com foco em dados.",
    photo: "/team/alisson-pinheiro.png",
  },
  {
    name: "Luis Henrique",
    role: "Marketing Director",
    bio: "Estratégia de marketing e growth para produtos digitais.",
    photo: "/team/luis-henrique.png",
  },
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
