"use server";
import { auth } from "@/auth";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { Organization, UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createSafeOrgAction } from "@/lib/create-safe-action";
import { CreateOrganization } from "./schema";
import { setCurrentOrg } from "../redis-org/redis-set-current-org";
import { v4 as uuidV4 } from "uuid";
const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await auth();
  if (!session?.user.id) {
    return { error: "Unauthorized" };
  }

  const { title } = data;

  let organization: Organization;
  const joinToken = uuidV4();

  try {
    organization = await db.organization.create({
      data: {
        name: title,
        token: joinToken,
      },
    });

    await db.organizationMembership.create({
      data: {
        user: { connect: { id: session.user.id } },
        organization: { connect: { id: organization.id } },
        role: UserRole.ADMIN,
      },
    });
  } catch (_) {
    return { error: "failed to create organization" };
  }
  await setCurrentOrg(organization.id, organization.name);
  return { data: organization };
};

export const createOrgAction = createSafeOrgAction(CreateOrganization, handler);
