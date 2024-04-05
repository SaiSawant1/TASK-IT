"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface InputType {
  organizationId: string;
  token: string;
  userId: string;
}

export const CreateNewMembership = async (data: InputType) => {
  const { token, organizationId, userId } = data;
  if (!token || !organizationId || !userId) {
    return { error: "Invalid fields" };
  }

  const session = await auth();
  if (!session?.user.id) {
    return { error: "user not authorized" };
  }

  const organization = await db.organization.findUnique({
    where: {
      id: organizationId,
    },
  });

  if (!organization) {
    return { error: "Organization Not found" };
  }

  const alreadyMember = await db.organizationMembership.findFirst({
    where: {
      organizationId,
      userId,
    },
  });

  if (alreadyMember) {
    return { data: alreadyMember };
  }

  try {
    const newMembership = await db.organizationMembership.create({
      data: {
        user: { connect: { id: session.user.id } },
        organization: { connect: { id: organization.id } },
      },
    });
    revalidatePath(`/organization/${organization}/settings`);
    return { data: newMembership };
  } catch (error) {
    return { error: "internal server error" };
  }
};
