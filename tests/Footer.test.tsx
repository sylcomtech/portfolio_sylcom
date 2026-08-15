import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

// Teste "de fora para dentro": não sabemos (nem importa) como o Footer é
// implementado por dentro — só verificamos o que o usuário efetivamente vê.
describe("Footer", () => {
  it("exibe a marca Sylcom e o texto de posicionamento", () => {
    render(<Footer />);

    expect(screen.getByAltText("Sylcom")).toBeInTheDocument();
    expect(screen.getByText("Sites e apps sob medida")).toBeInTheDocument();
  });

  it("exibe o aviso de copyright com o ano atual", () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(`© ${currentYear} Sylcom. Todos os direitos reservados.`)
    ).toBeInTheDocument();
  });
});
