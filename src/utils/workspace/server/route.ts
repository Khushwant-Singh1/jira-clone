import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createWorkspaceSchema } from "../schema";
import { SessionMiddleware } from "@/lib/SessionMiddleware";
import { DATABASE_ID, TABLE_ID } from "@/lib/config";
import { ID } from "node-appwrite"

const  app = new Hono()
.post(
"/",
zValidator("json", createWorkspaceSchema),
SessionMiddleware,
async(c)=>{
    const databases = c.get("databases");
    const user = c.get("user");

    const {name, description} = c.req.valid("json");

    const workspace = await databases.createDocument(
        DATABASE_ID!,
        TABLE_ID!,
        ID.unique(),
        {
            name,
            description,
        }
    )    

    return c.json({data:workspace})
}

);

export default app;

