"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
export const register = async (payload: z.infer<typeof RegisterSchema>) => {
  const validatedSchema = RegisterSchema.safeParse(payload);
  if (!validatedSchema.success) {
    return { error: "Invalid Credentail!" };
  }
  const { email, password, name } = validatedSchema.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const exitingUser = await getUserByEmail(email);

  if (exitingUser) {
    return { error: "Email  already in use" };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  return { success: "Confirmatin Email sent" };
};
