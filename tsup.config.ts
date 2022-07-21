import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ["src/index.ts", "src/plugins/*"],
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm']
})