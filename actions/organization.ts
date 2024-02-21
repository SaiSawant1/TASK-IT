"use server";

import { OrganizationList } from "@/app/(dashboard)/_components/organization-list";
import { getUserByEmail, getUserByID } from "@/data/user";
import { db } from "@/lib/db";
import { CreateOrgSchema } from "@/schemas";
import { connect } from "http2";
import * as z from "zod";
export const createOrganization = async (
  value: z.infer<typeof CreateOrgSchema>,
  email: string,
) => {
  const verifiedFields = CreateOrgSchema.safeParse(value);
  if (!verifiedFields.success) {
    return { error: "invalid fields" };
  }
  const { name } = verifiedFields.data;
  const user = await getUserByEmail(email);
  if (!user) {
    return { error: "No user found" };
  }

  const newOrganization = await db.organization.create({
    data: {
      name,
    },
  });
  await db.organizationMembership.create({
    data: {
      user: { connect: { id: user.id } },
      organization: { connect: { id: newOrganization.id } },
    },
  });
  return { success: "organization created" };
};
