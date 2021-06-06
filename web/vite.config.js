import { defineConfig } from "vite";
import elmPlugin from "vite-plugin-elm";
import windiCSSPlugin from "vite-plugin-windicss";

export default defineConfig({
  plugins: [elmPlugin(), windiCSSPlugin()],
});
