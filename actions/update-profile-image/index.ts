"use server";

import { auth } from "@/auth";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { UpdateProfileImageSchema } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { revalidatePath } from "next/cache";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user.id) return { error: "unauthrized" };

  const { userId, imageUrl } = data;

  let user;

  try {
    user = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        image: imageUrl,
      },
    });
    revalidatePath("/");
    revalidatePath("/user/settings");
  } catch (error) {
    return { error: "something went wrong" };
  }
  return { data: user };
};

export const UpdateProfileImage = createSafeAction(
  UpdateProfileImageSchema,
  handler,
);
