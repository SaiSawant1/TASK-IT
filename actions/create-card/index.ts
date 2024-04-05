"use server";

import { db } from "@/lib/db";
import { ReturnType, InputType } from "./types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateCardSchema } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user.id) {
    return { error: "unauthorize" };
  }

  const { title, boardId, listId } = data;

  let card;
  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        boardId: boardId,
      },
    });

    if (!list) {
      return { error: "List Not Found" };
    }

    const lastCard = await db.card.findFirst({
      where: {
        listId: listId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;
    card = await db.card.create({
      data: {
        title,
        listId,
        order: newOrder,
      },
    });
    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
    });
  } catch (error) {
    return { error: `${error}` };
  }
  revalidatePath(`/board/${boardId}`);

  return { data: card };
};

export const CreateCard = createSafeAction(CreateCardSchema, handler);
