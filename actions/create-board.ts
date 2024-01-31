"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import z from "zod";

const CreateBoard = z.object({
  title: z.string(),
});

export const create = async (formData: FormData) => {
  const { title } = CreateBoard.parse({
    title: formData.get("title"),
  });
  await db.board.create({
    data: {
      title,
    },
  });
  revalidatePath("/organization/clrvxnuev0004k8lmdi83p8o4");
};
