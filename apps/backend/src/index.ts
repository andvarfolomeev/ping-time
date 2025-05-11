import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  DaySlots,
  DaySlotsScheme,
  DaySlotsService,
  Sync,
} from "@repo/time-slot";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { cors } from "hono/cors";
import { SyncQueries } from "./queries";

type Bindings = { DB: D1Database };

const app = new Hono<{ Bindings: Bindings }>()
  .use(cors({ origin: "http://localhost:3050" }))
  .post(
    "/sync",
    zValidator("json", z.object({ title: z.string() })),
    async (c) => {
      const { title } = c.req.valid("json");
      const id = uuidv4();
      const { data } = new DaySlotsService();
      await SyncQueries.create(c.env.DB).insertSync(id, title, data);
      return c.json({ id }, 200);
    },
  )
  .get(
    "/sync/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param");
      const row = await SyncQueries.create(c.env.DB).selectById(id);
      if (!row) {
        return c.json({ message: "Not found" }, 404);
      }
      const { title, data } = row;
      const result: Sync = {
        id,
        title,
        daySlots: JSON.parse(data) as DaySlots,
      };
      return c.json(result, 200);
    },
  )
  .patch(
    "/sync/:id",
    zValidator("param", z.object({ id: z.string().uuid() })),
    zValidator("header", z.object({ username: z.string() })),
    zValidator("json", DaySlotsScheme),
    async (c) => {
      const { id } = c.req.valid("param");
      const { username } = c.req.valid("header");
      const userDaySlots = c.req.valid("json");
      const queries = SyncQueries.create(c.env.DB);
      const row = await queries.selectById(id);
      if (!row) {
        return c.json({ message: "Not found" }, 404);
      }
      const data = JSON.parse(row.data) as DaySlots;
      const service = new DaySlotsService(data).merge(userDaySlots, username);
      queries.updateById(id, service.data);
      return c.json({ message: "Sync is updated" });
    },
  );

export type AppType = typeof app;

export default app;
