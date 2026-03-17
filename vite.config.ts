import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: [
      { find: "@/components", replacement: path.resolve(__dirname, "./src/shared/components") },
      { find: "@/lib", replacement: path.resolve(__dirname, "./src/shared/lib") },
      { find: "@", replacement: path.resolve(__dirname, "./src") },
    ],
  },
});
