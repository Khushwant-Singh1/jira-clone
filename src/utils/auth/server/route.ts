import { Hono } from "hono";
import {zValidator} from "@hono/zod-validator";
import loginSchema from "@/utils/schema";
const app = new Hono()
.post("/login/:userId",
    zValidator("json", loginSchema),
    (c) => {
  return c.json({
    success: "ok",
  });
}
);

export default app;
