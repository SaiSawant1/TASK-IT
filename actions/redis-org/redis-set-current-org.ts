"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { createRedisInstance } from "@/lib/redis";

export const setCurrentOrg = async (orgId: string, orgName: string) => {
  const session = await auth();
  if (!session?.user.id) {
    return { error: "no user found" };
  }
  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  if (!user) {
    return { error: "no user found" };
  }
  if (!orgId) {
    return { error: "no organization ID" };
  }

  const org = await db.organization.findUnique({
    where: {
      id: orgId,
    },
  });

  if (!org) {
    return { error: "organization not found" };
  }

  const validMemberShip = await db.organizationMembership.findFirst({
    where: {
      userId: session.user.id,
      organizationId: org.id,
    },
  });

  if (!validMemberShip) {
    return { error: "unauthorized to access this org" };
  }

  const redis = createRedisInstance();

  let value = {
    orgName: orgName,
    orgId: orgId,
  };

  const payload = JSON.stringify(value);

  await redis.set(user.id, payload);

  const cached = await redis.get(user.id);

  if (!cached) {
    return { error: "failed to store" };
  }

  const response = JSON.parse(cached);
  redis.disconnect();

  return { data: response };
};
