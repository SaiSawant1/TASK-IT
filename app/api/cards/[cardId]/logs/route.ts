import { fetchCurrentOrg } from "@/actions/redis-org/redis-fetch-current-org";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { ENTITY_TYPE } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { cardId: string } },
) {
  try {
    const session = await auth();
    const org = await fetchCurrentOrg();
    if (!session || !org) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const auditLogs = await db.auditLog.findMany({
      where: {
        orgId: org.data?.orgId,
        userId: session.user.id,
        entityId: params.cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    return NextResponse.json(auditLogs);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
