import { Hono } from "hono";
import {zValidator} from "@hono/zod-validator";
import  {loginSchema, registerSchema } from "@/utils/schema";
const app = new Hono()
.post("/login",
    zValidator("json", loginSchema),
    (c) => {
  return c.json({
    email,
    password
  });
}
).post("/register",
    zValidator("json", registerSchema),
    (c) => {
  return c.json({
    email: c.req.body.email,
    password: c.req.body.password,
    name: c.req.body.name
  });
});

export default app;
