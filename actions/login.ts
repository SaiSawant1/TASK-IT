"use server";
import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationMail } from "@/lib/mail";
export const login = async (payload: z.infer<typeof LoginSchema>) => {
  const validatedSchema = LoginSchema.safeParse(payload);
  if (!validatedSchema.success) {
    return { error: "Invalid Credentail!" };
  }
  const { email, password } = validatedSchema.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials" };
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credential" };

        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
