"use server";

import { auth } from "@/auth";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();
  if (!session?.user.id) {
    return {
      error: "Unauthorized",
    };
  }
  const { title } = data;

  let board;
  try {
    board = await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    return { error: "Data base error. Failed to create Borad" };
  }
  revalidatePath(`board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
