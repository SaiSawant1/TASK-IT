"use server";

import { db } from "@/lib/db";
import { ReturnType, InputType } from "./types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteBoardSchema } from "./schema";
import { redirect } from "next/navigation";

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
  } catch (error) {
    return { error: `${error}` };
  }
  revalidatePath(`/organization/${board.orgId}`);

  redirect(`/organization/${board.orgId}`);
};

export const DeleteBoard = createSafeAction(DeleteBoardSchema, handler);
