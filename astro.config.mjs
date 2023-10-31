import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://david.bertet.fr",
  base: "/new",
  integrations: [tailwind()],
  output: "hybrid",
  adapter: node({
    mode: "standalone",
  }),
});
