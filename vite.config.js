import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./tests/vitest.setup.js"],
    include: ["./tests/produtos/**/*.test.js"],
    restoreMocks: true,
  },
});
