"use server";
import { auth } from "@/auth";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { Organization } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createSafeOrgAction } from "@/lib/create-safe-action";
import { CreateOrganization } from "./schema";
const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();
  if (!session?.user.id) {
    return { error: "Unauthorized" };
  }

  const { title } = data;

  let organization: Organization;

  try {
    organization = await db.organization.create({
      data: {
        name: title,
      },
    });

    await db.organizationMembership.create({
      data: {
        user: { connect: { id: session.user.id } },
        organization: { connect: { id: organization.id } },
      },
    });
  } catch (_) {
    return { error: "failed to create organization" };
  }
  revalidatePath(`/organization/${organization.id}`);
  return { data: organization };
};

export const createOrgAction = createSafeOrgAction(CreateOrganization, handler);
