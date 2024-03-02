"use server";

import { db } from "@/lib/db";
import { ReturnType, InputType } from "./types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCardOrderInSameListSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user.id) {
    return { error: "unauthorize" };
  }

  const { items, boardId } = data;

  let card;
  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
        },
        data: {
          order: card.order,
        },
      }),
    );
    card = await db.$transaction(transaction);
  } catch (error) {
    return { error: "Failed to reorder" };
  }
  revalidatePath(`/board/${boardId}`);

  return { data: card };
};

export const UpdateCardOrderInSameList = createSafeAction(
  UpdateCardOrderInSameListSchema,
  handler,
);
