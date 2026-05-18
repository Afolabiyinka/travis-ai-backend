import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    format: ["esm"],
    dts: false,
    splitting: false,
    sourcemap: false,
    clean: true,
    target: "node18",
    platform: "node",
    outExtension: () => ({ js: ".mjs" }),
});