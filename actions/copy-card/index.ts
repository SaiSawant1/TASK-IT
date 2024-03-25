"use server";

import { db } from "@/lib/db";
import { ReturnType, InputType } from "./types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyCardSchema } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user.id) {
    return { error: "unauthorize" };
  }

  const { id, boardId } = data;

  let card;
  try {
    const cardToCopy = await db.card.findUnique({ where: { id } });
    if (!cardToCopy) {
      return { error: "No Card Found" };
    }

    const lastCard = await db.card.findFirst({
      where: {
        listId: cardToCopy.listId,
      },
      orderBy: {
        order: "desc",
      },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;
    card = await db.card.create({
      data: {
        order: newOrder,
        title: cardToCopy.title + "[COPY]",
        description: cardToCopy.description,
        listId: cardToCopy.listId,
      },
    });
    await createAuditLog({
      action: ACTION.CREATE,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      entityTitle: card.title,
    });
  } catch (error) {
    return { error: `${error}` };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const CopyCard = createSafeAction(CopyCardSchema, handler);
