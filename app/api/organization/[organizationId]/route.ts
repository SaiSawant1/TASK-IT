import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { organizationId: string } },
) {
  const organizationId = context.params.organizationId;

  try {
    const organization = await db.organization.findUnique({
      where: {
        id: organizationId,
      },
    });

    return NextResponse.json(organization);
  } catch (error) {
    return new NextResponse("Internal server Error", { status: 500 });
  }
}
