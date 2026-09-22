import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://david.bertet.fr",
  base: "",
  integrations: [icon()],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "static",
  adapter: node({
    mode: "standalone",
  }),
});
