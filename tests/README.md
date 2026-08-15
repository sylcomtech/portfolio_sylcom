# Testes (proposta)

Setup de exemplo com **Vitest + React Testing Library**, a combinação mais
leve/compatível com Next.js 16 + React 19 hoje (mais leve que Jest, que
ainda tem atrito com ESM/React 19; e mais rápido, já que reaproveita
esbuild/Vite em vez de um transform próprio).

Nada aqui foi instalado nem plugado no `package.json` — só os arquivos de
config e os testes de exemplo. Ver resumo completo em
`agent-tdd.md` (scratchpad da sessão) para o racional.

## Dependências necessárias (não instaladas)

```bash
npm install -D vitest @vitejs/plugin-react vite-tsconfig-paths jsdom \
  @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

Compatibilidade: `@testing-library/react@16.x` já suporta React 19.

## Script sugerido para o package.json (não aplicado)

```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest"
}
```

## Como rodar (depois de instalar as dependências acima)

```bash
npx vitest run --config vitest.config.ts
```

## Arquivos

- `../vitest.config.ts` — config do Vitest (ambiente jsdom, alias `@/*` via
  `vite-tsconfig-paths`, setup file).
- `setup.ts` — mocks de `ResizeObserver`/`IntersectionObserver`/`matchMedia`
  exigidos pelo Framer Motion (`whileInView`, `layout`) em jsdom.
- `Footer.test.tsx` — teste de renderização "outside-in": confere o que o
  usuário vê (marca, texto de posicionamento, copyright), sem acoplar ao
  markup interno.
- `Projects.test.tsx` — teste do filtro de categorias. Como
  `src/lib/data.ts` hoje exporta `projects: []`, o teste faz
  `vi.mock("@/lib/data", ...)` para injetar projetos fake com 2 categorias
  e verificar o comportamento de clique nos filtros (London School:
  isola o componente do seu colaborador de dados via mock/contrato).
