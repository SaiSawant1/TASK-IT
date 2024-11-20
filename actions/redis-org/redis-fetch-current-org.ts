"use server";

import { auth } from "@/auth";
import { createRedisInstance } from "@/lib/redis";

interface organization {
  orgId: string;
  orgName: string;
}

type ReturnType = {
  error?: string;
  data?: organization;
};

export const fetchCurrentOrg = async (): Promise<ReturnType> => {
  const session = await auth();

  if (!session?.user.id) {
    return { error: "no user found" };
  }

  const redis = createRedisInstance();

  const cached = await redis.get(session.user.id);
  if (!cached) {
    return { error: "no org found" };
  }

  const data = JSON.parse(cached);

  redis.disconnect();

  return { data: data };
};
