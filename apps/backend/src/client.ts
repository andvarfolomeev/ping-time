import type { AppType } from ".";
import { hc } from "hono/client";

const createClient = hc<AppType>;

export default createClient;
