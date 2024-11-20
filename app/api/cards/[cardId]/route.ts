import { fetchCurrentOrg } from "@/actions/redis-org/redis-fetch-current-org";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ cardId: string }> },
) {
  try {
    const session = await auth();
    const { data } = await fetchCurrentOrg();
    if (!session?.user.id || !data?.orgId) {
      return new NextResponse("Unauthorized", { status: 404 });
    }
    const card = await db.card.findUnique({
      where: {
        id: (await params).cardId,
        list: {
          board: {
            orgId: data.orgId,
          },
        },
      },
      include: {
        list: {
          select: {
            title: true,
          },
        },
      },
    });
    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
