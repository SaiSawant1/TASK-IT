"use server";

import { db } from "@/lib/db";
import { ReturnType, InputType } from "./types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyListSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user.id) {
    return { error: "unauthorize" };
  }

  const { id, boardId } = data;

  let list;
  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
      },
      include: {
        cards: true,
      },
    });
    if (!listToCopy) {
      return { error: "List not found" };
    }
    const lastList = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        boardId: listToCopy.boardId,
        order: newOrder,
        title: `${listToCopy.title} - Copy`,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              order: card.order,
              description: card.description,
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    });
  } catch (error) {
    return { error: `${error}` };
  }
  revalidatePath(`/board/${list.boardId}`);
  return { data: list };
};

export const CopyList = createSafeAction(CopyListSchema, handler);
