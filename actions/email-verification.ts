"use server";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export const emailVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) return { error: "Token does not exist in database" };
  const user = await getUserByEmail(existingToken.email);

  if (!user) return { error: "user not found" };

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "token has expired" };
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: new Date(),
    },
  });
  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });
  return { success: "user verificationToken successfull" };
};
