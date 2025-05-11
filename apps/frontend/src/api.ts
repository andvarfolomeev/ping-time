import createClient from "@repo/backend";

const prefixUrl = "http://localhost:8787" as string;

export const client = createClient(prefixUrl);
