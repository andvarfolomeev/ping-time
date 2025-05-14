import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VitePluginVueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
  base: "/ping-time/",
  plugins: [vue(), VitePluginVueDevTools()],
  server: {
    port: 3050,
  },
});
