import { Context, Hono } from "hono";
import {zValidator} from "@hono/zod-validator";
<<<<<<< HEAD
import  {loginSchema, registerSchema } from "@/utils/schema";
import { createAdminClient } from "@/lib/appwrite";
import { ID, Models } from "node-appwrite";
import { setCookie } from "hono/cookie";
import { AUTH_COOKIE } from "../constants";
import path from "path";

const app = new Hono()
.post("/login",
    zValidator("json", loginSchema),
    async(c) => {
  const { email, password } = await c.req.valid("json");
  const { account } = await createAdminClient();
  const session = await account.createEmailPasswordSession(email, password);

   setCookie(c, AUTH_COOKIE, session.secret, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30 // 1 week
  });


  return c.json({
   success:true
  });
}).post("/register",
    zValidator("json", registerSchema),
    async (c) => {
  const { email, password, name } = await c.req.valid("json");
  const { account } = await createAdminClient();
  const user = await account.create(
    ID.unique(),
    email,
    password,
    name
  );

  const session = await account.createEmailPasswordSession(email, password);
  setCookie(c, AUTH_COOKIE, session.secret, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30 // 1 week
  });

  return c.json({
    data:user,
  });
});
=======
import { loginSchema, registerSchema } from "@/utils/schema";
import { z } from "zod";
const app = new Hono()
.post("/login",
    zValidator("json", loginSchema),
    async (c) => {

      const {email, password }  = await c.req.valid("json");

      return c.json({
        email, password})
}
).post("/register",
    zValidator("json", registerSchema),
    async (c) => {
      const {name, email, password }  = await c.req.valid("json");

      return c.json({
        name, email, password})
    })
>>>>>>> 7af2f2a (feat: refactor authentication flow; implement registration functionality and update schemas for login and registration)

export default app;


