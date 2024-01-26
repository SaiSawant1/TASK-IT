import { getVerificationTokenByEmail } from "@/data/verification-token";
import { db } from "./db";
import { v4 as uuidv4 } from "uuid";
export const generateVerificationToken = async (email: string) => {
  const exitingVerificationToken = await getVerificationTokenByEmail(email);

  if (exitingVerificationToken) {
    await db.verificationToken.delete({
      where: {
        id: exitingVerificationToken.id,
      },
    });
  }

  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const verificationToken = await db.verificationToken.create({
    data: {
      token,
      email,
      expires,
    },
  });
  return verificationToken;
};
