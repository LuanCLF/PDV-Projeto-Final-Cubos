import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./tests/vitest.setup.js"],
    include: ["./tests/clientes/**/*.test.js"],
    restoreMocks: true,
  },
});
