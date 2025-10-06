"use server";

import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";
import { AUTH_COOKIE } from "./constants";

export const getCurrent = async () => {
  try {
    const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
    const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

    if (!endpoint || !project) {
      console.error("Missing Appwrite configuration:", {
        endpoint: !!endpoint,
        project: !!project
      });
      return null;
    }

    const client = new Client()
      .setEndpoint(endpoint)
      .setProject(project);

    const session = await (await cookies()).get(AUTH_COOKIE);

    if (!session) {
      console.log("No auth session found");
      return null;
    }

    client.setSession(session.value)

    const account = new Account(client);

    const user = await account.get();
    console.log("Successfully retrieved user:", user.email);
    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    // Log additional debugging info
    console.error("Environment check:", {
      endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ? "Set" : "Missing",
      project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT ? "Set" : "Missing"
    });
    return null;
  }
};
