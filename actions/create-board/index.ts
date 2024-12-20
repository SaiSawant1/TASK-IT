"use server";

import { auth } from "@/auth";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { hasAvailabelCount, incrementAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";
const handler = async (data: InputType, orgId: string): Promise<ReturnType> => {
  const session = await auth();
  if (!session?.user.id) {
    return {
      error: "Unauthorized",
    };
  }

  const canCreate = await hasAvailabelCount();
  const isPro = await checkSubscription();

  if (!canCreate && !isPro) {
    return {
      error:
        "You have reached your limit of free boards. Please upgrade to create more.",
    };
  }
  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHtml, imageUserName] =
    image.split("|");
  let board;
  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHtml ||
    !imageUserName
  ) {
    return { error: "missing fields" };
  }
  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHtml,
        imageUserName,
      },
    });
    await createAuditLog({
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.CREATE,
      entityTitle: board.title,
      entityId: board.id,
    });
  } catch (error) {
    return { error: "Data base error. Failed to create Borad" };
  }
  if (!isPro) {
    await incrementAvailableCount();
  }
  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
