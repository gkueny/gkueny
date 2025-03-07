import { vitePlugin as remix } from "@remix-run/dev";
import { createRoutesFromFolders } from "@remix-run/v1-route-convention";
import { defineConfig } from "vite";
import { installGlobals } from "@remix-run/node";
import tailwindcss from "@tailwindcss/vite";

installGlobals();

export default defineConfig({
  plugins: [
    tailwindcss(),
    remix({
      ignoredRouteFiles: ["**/*.css"],
      routes(defineRoutes) {
        // uses the v1 convention, works in v1.15+ and v2
        return createRoutesFromFolders(defineRoutes);
      },
    }),
  ],
});
