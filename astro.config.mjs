import cloudflare from "@astrojs/cloudflare";
import { defineConfig } from "astro/config";

export default defineConfig({
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  // Do not let the adapter create a KV namespace for Astro Sessions.
  // Admin sessions will be designed and tested separately before use.
  session: false,
});
