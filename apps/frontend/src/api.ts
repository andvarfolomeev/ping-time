import createClient from "@repo/backend";

export const client = createClient(
  import.meta.env.VITE_API_URL ?? "http://localhost:8787",
);
