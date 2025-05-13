import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const registerSchema = z.object({
 name: z.string().trim().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
  })


export { loginSchema, registerSchema };