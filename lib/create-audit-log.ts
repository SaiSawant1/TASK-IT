import { fetchCurrentOrg } from "@/actions/redis-org/redis-fetch-current-org";
import { auth } from "@/auth";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { db } from "./db";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async (props: Props) => {
  try {
    const { data } = await fetchCurrentOrg();
    const orgId = data?.orgId;
    const session = await auth();
    if (!session?.user) {
      throw new Error("user not found");
    }
    const userId = session?.user.id;
    if (!userId || !orgId) {
      throw new Error("user not found");
    }

    const { entityType, action, entityId, entityTitle } = props;

    await db.auditLog.create({
      data: {
        action,
        entityId,
        userId,
        orgId,
        userName: session?.user.name!,
        entityType,
        entityTitle,
        userImage: session?.user.image || "null",
      },
    });
  } catch (error) {
    console.log("AUDIT_LOG_ERROR)", error);
  }
};
