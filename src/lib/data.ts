import { Globe, ShoppingCart, Smartphone, Settings, type LucideIcon } from "lucide-react";

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: "Site institucional" | "E-commerce" | "App mobile" | "Sistema web" | "Varejo" | "Landing Page";
  description: string;
  tags: string[];
  gradient: string;
  image?: string;
  href?: string;
};

export const projects: Project[] = [
  {
    slug: "porto-aliancas",
    title: "Porto Alianças",
    client: "Porto Alianças",
    category: "Varejo",
    description:
      "Site institucional para uma joalheria especializada em alianças de casamento e compromisso sob medida, com galeria da coleção, depoimentos, FAQ e contato direto via WhatsApp.",
    tags: ["React", "Vite", "WhatsApp"],
    gradient: "from-amber-500 via-yellow-700 to-emerald-950",
    image: "/projects/porto-aliancas.png",
    href: "https://portoaliancas.vercel.app/",
  },
  {
    slug: "rp-consultoria",
    title: "RP Consultoria",
    client: "RP Consultoria | HS Consórcios",
    category: "Landing Page",
    description:
      "Landing page para consultoria de consórcios de imóveis e veículos, com simulador de crédito, marketplace de cartas contempladas e captação de leads via formulário e WhatsApp.",
    tags: ["Simulador de crédito", "Marketplace de crédito", "WhatsApp"],
    gradient: "from-red-600 via-red-900 to-neutral-950",
    image: "/projects/rp-consultoria.png",
    href: "https://landingpage-rp-consultoria.vercel.app/",
  },
];

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
