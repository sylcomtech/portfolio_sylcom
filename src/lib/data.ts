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

export const projects: Project[] = [
  {
    slug: "golden-point",
    title: "Golden Point",
    client: "Arena Golden Point",
    category: "Sistema web",
    description:
      "Site e sistema de gestão para uma arena de padel e pickleball em Porto Alegre: reservas de quadra, fila de jogadores em tempo real e controle de partidas no modo Play.",
    tags: ["React", "Vite", "Supabase", "PWA"],
    gradient: "from-emerald-500 via-green-600 to-teal-700",
    image: "/projects/golden-point.png",
    href: "https://arena-golden-point-quadras.vercel.app/",
  },
];

export const services = [
  {
    title: "Sites institucionais",
    description: "Sites rápidos, responsivos e otimizados para SEO que representam sua marca.",
  },
  {
    title: "E-commerce",
    description: "Lojas virtuais completas, do catálogo ao checkout, prontas para vender.",
  },
  {
    title: "Aplicativos mobile",
    description: "Apps iOS e Android nativos ou híbridos, do MVP ao lançamento nas lojas.",
  },
  {
    title: "Sistemas sob medida",
    description: "Plataformas e ferramentas internas para automatizar processos do seu negócio.",
  },
];
