import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "@/utils/schema";
import { createAdminClient } from "@/lib/appwrite";
import { Account, ID } from "node-appwrite";
import { deleteCookie, setCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constants";
import { SessionMiddleware } from "@/lib/SessionMiddleware";

const app = new Hono()
  .get("/current", SessionMiddleware, (c) => {
    const user = c.get("user");
    return c.json({ data: user });
  })

  .post("/login", zValidator("json", loginSchema), async (c) => {
    try {
      const { email, password } = await c.req.valid("json");
      const { account } = await createAdminClient();
      const session = await account.createEmailPasswordSession(email, password);

      setCookie(c, AUTH_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      return c.json({
        success: true,
      });
    } catch (error) {
      console.error("Login error:", error);
      return c.json({ 
        error: "Invalid credentials or connection failed" 
      }, 401);
    }
  })
  .post("/register", zValidator("json", registerSchema), async (c) => {
    try {
      const { email, password, name } = await c.req.valid("json");
      const { account } = await createAdminClient();
      const user = await account.create(ID.unique(), email, password, name);

      const session = await account.createEmailPasswordSession(email, password);
      setCookie(c, AUTH_COOKIE, session.secret, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      return c.json({
        data: user,
      });
    } catch (error) {
      console.error("Registration error:", error);
      return c.json({ 
        error: "Registration failed or connection error" 
      }, 400);
    }
  })
  .post("/logout", SessionMiddleware, (c) => {
    const account = c.get("account");
    deleteCookie(c, AUTH_COOKIE);

    return c.json({ success: true });
  });

export default app;
