//import { auth } from "@/auth";
import { db } from "@/lib/db";
import { MAX_FREE_BOARD } from "@/constants/boards";
import { fetchCurrentOrg } from "@/actions/redis-org/redis-fetch-current-org";

export const incrementAvailableCount = async () => {
  const { data } = await fetchCurrentOrg();
  if (!data?.orgId) {
    throw new Error("unauthorized");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId: data.orgId,
    },
  });
  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId: data.orgId },
      data: {
        count: orgLimit.count + 1,
      },
    });
  } else {
    await db.orgLimit.create({
      data: {
        count: 1,
        orgId: data.orgId,
      },
    });
  }
};

export const decrementAvailableCount = async () => {
  const { data } = await fetchCurrentOrg();
  if (!data?.orgId) {
    throw new Error("unauthorized");
  }

  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId: data.orgId,
    },
  });
  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId: data.orgId },
      data: {
        count: orgLimit.count > 0 ? orgLimit.count - 1 : 0,
      },
    });
  } else {
    await db.orgLimit.create({
      data: {
        count: 1,
        orgId: data.orgId,
      },
    });
  }
};

export const hasAvailabelCount = async () => {
  const { data } = await fetchCurrentOrg();
  if (!data?.orgId) {
    throw new Error("unauthorized");
  }
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId: data.orgId },
  });
  if (!orgLimit || orgLimit.count < MAX_FREE_BOARD) {
    return true;
  } else {
    return false;
  }
};

export const getAvailableCount = async () => {
  const { data } = await fetchCurrentOrg();
  if (!data?.orgId) {
    throw new Error("unauthorized");
  }
  const orgLimit = await db.orgLimit.findUnique({
    where: {
      orgId: data.orgId,
    },
  });
  if (!orgLimit) {
    return 0;
  }
  return orgLimit?.count;
};
