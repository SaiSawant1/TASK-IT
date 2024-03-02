"use server";

import { db } from "@/lib/db";
import { ReturnType, InputType } from "./types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCardOrderInDifferenListSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user.id) {
    return { error: "unauthorize" };
  }

  const { SourceCards, DestinationCards, destinationListId, boardId } = data;

  let cards;
  try {
    const updateSourceList = SourceCards.map((card) =>
      db.card.update({
        where: {
          id: card.id,
        },
        data: {
          order: card.order,
        },
      }),
    );
    await db.$transaction(updateSourceList);
    const updateDestinationList = DestinationCards.map((card) =>
      db.card.update({
        where: {
          id: card.id,
        },
        data: {
          order: card.order,
          listId: destinationListId,
        },
      }),
    );
    cards = await db.$transaction(updateDestinationList);
  } catch (error) {
    return { error: "Failed to reorder" };
  }
  revalidatePath(`/board/${boardId}`);

  return { data: cards };
};

export const UpdateCardOrderInDifferentList = createSafeAction(
  UpdateCardOrderInDifferenListSchema,
  handler,
);
