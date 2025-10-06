import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { createWorkspaceSchema } from "../schema";
import { SessionMiddleware } from "@/lib/SessionMiddleware";
import { DATABASE_ID, IMAGES_BUCKET_ID, TABLE_ID } from "@/lib/config";
import { ID } from "node-appwrite";

const app = new Hono().post(
  "/",
  zValidator("form", createWorkspaceSchema),
  SessionMiddleware,
  async (c) => {
    const databases = c.get("databases");
    const storage = c.get("storage");
    const user = c.get("user");

    const { name, description, image } = c.req.valid("form");
    let uploadedImageUrl: string | undefined;

    if (image instanceof File) {
      const file = await storage.createFile(
        IMAGES_BUCKET_ID!,
        ID.unique(),
        image
      );

      // Get the file view URL for the uploaded image
      uploadedImageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${IMAGES_BUCKET_ID}/files/${file.$id}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`;
    }

    const workspace = await databases.createDocument(
      DATABASE_ID!,
      TABLE_ID!,
      ID.unique(),
      {
        name,
        description,
        imageUrl: uploadedImageUrl
      }
    );

    return c.json({ data: workspace });
  }
);

export default app;
