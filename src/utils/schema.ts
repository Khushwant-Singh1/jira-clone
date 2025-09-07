import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

<<<<<<< HEAD
const registerSchema = z.object({
 name: z.string().trim().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
  })


export { loginSchema, registerSchema };
=======


export const registerSchema = z.object({
  name:z.string().trim().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});
>>>>>>> 7af2f2a (feat: refactor authentication flow; implement registration functionality and update schemas for login and registration)
