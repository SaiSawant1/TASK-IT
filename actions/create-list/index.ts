"use server";

import { db } from "@/lib/db";
import { ReturnType, InputType } from "./types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateListSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user.id) {
    return { error: "unauthorize" };
  }

  const { title, boardId } = data;

  let list;
  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
      },
      include: {
        lists: true,
      },
    });
    if (!board) {
      return { error: "Board Not Found" };
    }
    const lastList = await db.list.findFirst({
      where: {
        boardId: boardId,
      },
      orderBy: {
        order: "desc",
      },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;
    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
    });
  } catch (error) {
    return { error: `${error}` };
  }
  revalidatePath(`/board/${boardId}`);

  return { data: list };
};

export const CreateList = createSafeAction(CreateListSchema, handler);
