import * as z from "zod";
export const LoginSchema = z.object({
  email: z.string().email({ message: "email required" }),
  password: z.string().min(1, "password required"),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "invalid name" }),
  email: z.string().email({ message: "invalid email" }),
  password: z.string().min(6, { message: "aleast 6 characters" }),
});
