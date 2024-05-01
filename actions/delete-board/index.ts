"use server";

import { db } from "@/lib/db";
import { ReturnType, InputType } from "./types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteBoardSchema } from "./schema";
import { redirect } from "next/navigation";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { decrementAvailableCount } from "@/lib/org-limit";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user.id) {
    return { error: "unauthorize" };
  }

  const { id } = data;

  let board;
  try {
    board = await db.board.delete({
      where: {
        id,
      },
    });
    await createAuditLog({
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
      entityTitle: board.title,
      entityId: board.id,
    });
  } catch (error) {
    return { error: `${error}` };
  }
  await decrementAvailableCount();
  revalidatePath(`/organization/${board.orgId}`);

  redirect(`/organization/${board.orgId}`);
};

export const DeleteBoard = createSafeAction(DeleteBoardSchema, handler);
