"use server";

import { db } from "@/lib/db";
import { ReturnType, InputType } from "./types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCardSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user.id) {
    return { error: "unauthorize" };
  }

  const { id, boardId, ...values } = data;

  let card;
  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          boardId,
        },
      },
      data: { ...values },
    });
  } catch (error) {
    return { error: `${error}` };
  }
  revalidatePath(`/board/${boardId}`);

  return { data: card };
};

export const UpdateCard = createSafeAction(UpdateCardSchema, handler);
