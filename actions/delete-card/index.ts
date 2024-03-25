"use server";

import { db } from "@/lib/db";
import { ReturnType, InputType } from "./types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteCardSchema } from "./schema";
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
    card = await db.card.delete({
      where: {
        id,
        list: {
          boardId,
        },
      },
    });
    await createAuditLog({
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.DELETE,
      entityTitle: card.title,
      entityId: card.id,
    });
  } catch (error) {
    return { error: `${error}` };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const DeleteCard = createSafeAction(DeleteCardSchema, handler);
