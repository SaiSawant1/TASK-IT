"use server";

import { db } from "@/lib/db";
import { ReturnType, InputType } from "./types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateListOrderSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user.id) {
    return { error: "unauthorize" };
  }

  const { items, boardId } = data;

  let lists;
  try {
    const transaction = items.map((list) =>
      db.list.update({
        where: {
          id: list.id,
        },
        data: {
          order: list.order,
        },
      }),
    );
    lists = await db.$transaction(transaction);
  } catch (error) {
    return { error: "Failed to reorder" };
  }
  revalidatePath(`/board/${boardId}`);

  return { data: lists };
};

export const UpdateListOrder = createSafeAction(UpdateListOrderSchema, handler);
