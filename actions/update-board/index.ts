"use server";

import { db } from "@/lib/db";
import { ReturnType, InputType } from "./types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateBoardSchema } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user.id) {
    return { error: "unauthorize" };
  }

  const { title, id } = data;

  let board;
  try {
    board = await db.board.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
    await createAuditLog({
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.UPDATE,
      entityTitle: board.title,
      entityId: board.id,
    });
  } catch (error) {
    return { error: `${error}` };
  }
  revalidatePath(`/board/${id}`);

  return { data: board };
};

export const UpdateBoard = createSafeAction(UpdateBoardSchema, handler);
