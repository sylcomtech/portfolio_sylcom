import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// `src/lib/data.ts` hoje exporta `projects: []` (portfólio ainda vazio em
// produção), então não dá pra exercitar o filtro de categorias com os dados
// reais. Seguindo a abordagem London School (mock-first): isolamos o
// componente do seu colaborador (`@/lib/data`) e definimos, via mock, o
// contrato de dados que o Projects.tsx espera consumir. Isso também
// documenta o "contrato" de shape do Project para quem for popular
// src/lib/data.ts de verdade.
//
// Nenhum dos dois mocks define `image`: ProjectCard então renderiza o
// título tanto no placeholder decorativo (span grande) quanto no <h3> —
// de propósito, pra continuar cobrindo esse fallback. Por isso as queries
// abaixo usam getByRole("heading", ...) em vez de getByText: é o <h3> que
// carrega o significado semântico do card, o span grande é decoração.
vi.mock("@/lib/data", () => ({
  projects: [
    {
      slug: "site-institucional-a",
      title: "Site A",
      client: "Cliente A",
      category: "Site institucional",
      description: "Site institucional para a Cliente A.",
      tags: ["Next.js", "SEO"],
      gradient: "from-blue-500 to-purple-500",
    },
    {
      slug: "loja-b",
      title: "Loja B",
      client: "Cliente B",
      category: "E-commerce",
      description: "Loja virtual completa para a Cliente B.",
      tags: ["Shopify"],
      gradient: "from-green-500 to-teal-500",
    },
  ],
  services: [],
}));

const { default: Projects } = await import("@/components/Projects");

function heading(name: string) {
  return screen.queryByRole("heading", { name, level: 3 });
}

describe("Projects - filtro de categorias", () => {
  it("mostra todos os projetos quando o filtro ativo é 'Todos'", () => {
    render(<Projects />);

    expect(heading("Site A")).toBeInTheDocument();
    expect(heading("Loja B")).toBeInTheDocument();
  });

  it("ao clicar em uma categoria, mostra só os projetos daquela categoria", async () => {
    const user = userEvent.setup();
    render(<Projects />);

    await user.click(screen.getByRole("button", { name: "E-commerce" }));

    // "Site A" exits via AnimatePresence rather than unmounting instantly —
    // poll for its removal instead of asserting mid-transition.
    await waitFor(() => expect(heading("Site A")).not.toBeInTheDocument());
    expect(heading("Loja B")).toBeInTheDocument();
  });

  it("clicar em 'Todos' novamente volta a mostrar todos os projetos", async () => {
    const user = userEvent.setup();
    render(<Projects />);

    await user.click(screen.getByRole("button", { name: "E-commerce" }));
    await user.click(screen.getByRole("button", { name: "Todos" }));

    // findBy* (async, polls) rather than getBy* here: switching back to
    // "Todos" re-mounts "Site A" while its previous exit animation may
    // still be settling under AnimatePresence — poll instead of asserting
    // mid-transition.
    expect(await screen.findByRole("heading", { name: "Site A", level: 3 })).toBeInTheDocument();
    expect(heading("Loja B")).toBeInTheDocument();
  });
});
