"use server";
import { db } from "@/lib/db";

export const getBoards = async (orgId: string) => {
  if (!orgId) {
    return { error: "no org id" };
  }
  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return { data: boards };
};
