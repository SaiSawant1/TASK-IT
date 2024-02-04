"use server";
import { auth } from "@/auth";
import { ReturnType } from "./types";
import { getUserByID } from "@/data/user";
import { db } from "@/lib/db";

export const getAllOrgsOfCurrentUser = async (): Promise<ReturnType> => {
  const session = await auth();
  if (!session?.user.id) {
    return { error: "Unauthorized" };
  }
  const existingUser = await getUserByID(session?.user.id);

  if (!existingUser) {
    return { error: "no user exitst" };
  }

  const userWithMembership = await db.user.findUnique({
    where: {
      id: existingUser.id,
    },
    include: {
      organizationMembership: { include: { organization: true } },
    },
  });
  if (!userWithMembership?.organizationMembership) {
    return { error: "No membership for current user" };
  }

  const organizationList = userWithMembership?.organizationMembership.map(
    (value) => value.organization,
  );

  return { data: organizationList };
};
