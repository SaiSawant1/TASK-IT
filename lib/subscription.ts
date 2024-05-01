import { fetchCurrentOrg } from "@/actions/redis-org/redis-fetch-current-org";
import { db } from "./db";

export const checkSubscription = async () => {
  const { data } = await fetchCurrentOrg();
  if (!data?.orgId) {
    return false;
  }

  const orgSubscription = await db.orgSubscription.findUnique({
    where: {
      orgId: data.orgId,
    },
    select: {
      stripeCurrentPeriodEnd: true,
      stripePriceId: true,
      stripeCustomerId: true,
      stripeSubscriptionId: true,
    },
  });

  if (!orgSubscription) {
    return false;
  }
  const DAY_IN_MS = 86400000;
  const isValid =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;
};
