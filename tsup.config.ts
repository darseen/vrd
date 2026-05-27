import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: true,
  clean: true,
  noExternal: ["@repo/types"], // keep this, as I'm gonna make this a monorepo soon
});
