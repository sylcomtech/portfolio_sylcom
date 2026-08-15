import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// Config de exemplo para Vitest + React Testing Library.
// Depende de devDependencies que ainda não estão instaladas (ver tests/README.md).
// Não é referenciado por nenhum script de package.json ainda — rode com:
//   npx vitest run --config vitest.config.ts
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
    css: true,
    include: ["tests/**/*.test.{ts,tsx}"],
  },
});
