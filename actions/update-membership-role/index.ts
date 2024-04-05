"use server";

import { auth } from "@/auth";
import { InputType, ReturnType } from "./type";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateMembershipRoleSchema } from "./schema";
import { revalidatePath } from "next/cache";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user.id) {
    return { error: "unauthorize" };
  }

  const { role, userId, membershipId, organizationId } = data;

  if (!role || !userId || !membershipId || !organizationId) {
    return { error: "invalid fields" };
  }

  const membership = await db.organizationMembership.findUnique({
    where: {
      id: membershipId,
    },
  });
  if (!membership) {
    return { error: "no membership" };
  }

  let updatedMembership;

  try {
    updatedMembership = await db.organizationMembership.update({
      where: {
        id: membershipId,
        organizationId,
        userId,
      },
      data: {
        role,
      },
    });
    revalidatePath(`/organization/${organizationId}`);
    return { data: updatedMembership };
  } catch (error) {
    return { error: "Failed to update role" };
  }
};

export const UpdateMembershipRole = createSafeAction(
  UpdateMembershipRoleSchema,
  handler,
);
