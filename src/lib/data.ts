export type Project = {
  slug: string;
  title: string;
  client: string;
  category: "Site institucional" | "E-commerce" | "App mobile" | "Sistema web";
  description: string;
  tags: string[];
  gradient: string;
  href?: string;
};

// Amostras iniciais — troque pelos projetos reais da empresa quando disponíveis.
export const projects: Project[] = [
  {
    slug: "nimbus-ecommerce",
    title: "Nimbus Store",
    client: "Nimbus Moda",
    category: "E-commerce",
    description:
      "Loja virtual completa com catálogo dinâmico, checkout otimizado e painel de gestão de pedidos.",
    tags: ["Next.js", "Stripe", "Headless CMS"],
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
  {
    slug: "orbita-app",
    title: "Órbita",
    client: "Órbita Fitness",
    category: "App mobile",
    description:
      "Aplicativo de treinos com acompanhamento em tempo real, planos personalizados e notificações push.",
    tags: ["React Native", "Node.js", "PostgreSQL"],
    gradient: "from-cyan-400 via-sky-500 to-blue-600",
  },
  {
    slug: "vertex-institucional",
    title: "Vertex Advocacia",
    client: "Vertex Advogados",
    category: "Site institucional",
    description:
      "Site institucional com foco em performance, SEO técnico e formulário de contato integrado ao CRM.",
    tags: ["Next.js", "Tailwind", "SEO"],
    gradient: "from-amber-400 via-orange-500 to-rose-500",
  },
  {
    slug: "flux-erp",
    title: "Flux Gestão",
    client: "Flux Logística",
    category: "Sistema web",
    description:
      "Sistema web de gestão logística com dashboards em tempo real e controle de frota.",
    tags: ["React", "Node.js", "WebSockets"],
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
  },
  {
    slug: "aura-marketplace",
    title: "Aura Marketplace",
    client: "Aura Home",
    category: "E-commerce",
    description:
      "Marketplace multi-vendedor com gestão de comissões, avaliações e pagamentos divididos.",
    tags: ["Next.js", "Supabase", "Pagar.me"],
    gradient: "from-violet-500 via-indigo-500 to-blue-500",
  },
  {
    slug: "pulso-saude",
    title: "Pulso Saúde",
    client: "Pulso Clínicas",
    category: "App mobile",
    description:
      "App de agendamento de consultas com telemedicina integrada e prontuário digital.",
    tags: ["Flutter", "Firebase", "WebRTC"],
    gradient: "from-rose-400 via-pink-500 to-fuchsia-600",
  },
];

export const stats = [
  { label: "Projetos entregues", value: 48 },
  { label: "Clientes atendidos", value: 32 },
  { label: "Anos de experiência", value: 6 },
  { label: "Satisfação dos clientes", value: 98, suffix: "%" },
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
