import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/blocks.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  // React lo provee la app consumidora (peer dep).
  external: ['react', 'react-dom'],
  // Mantener la directiva 'use client' en el bundle para Next.js App Router.
  banner: { js: '"use client";' },
});
