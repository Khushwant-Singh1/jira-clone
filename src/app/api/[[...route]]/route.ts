import { Hono } from "hono";
import { handle } from "hono/vercel";
import auth from "@/utils/auth/server/route";
import workspace from "@/utils/workspace/server/route";

const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/auth", auth).route("/workspace", workspace);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
