"use server";

import { db } from "@/lib/db";
import { ReturnType, InputType } from "./types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateListSchema } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user.id) {
    return { error: "unauthorize" };
  }

  const { title, id, boardId } = data;

  let list;
  try {
    list = await db.list.update({
      where: {
        id,
        boardId,
      },
      data: {
        title,
      },
    });
    await createAuditLog({
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.UPDATE,
      entityTitle: list.title,
      entityId: list.id,
    });
  } catch (error) {
    return { error: `${error}` };
  }
  revalidatePath(`/board/${boardId}`);

  return { data: list };
};

export const ListUpdate = createSafeAction(UpdateListSchema, handler);
