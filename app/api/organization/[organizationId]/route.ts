import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ organizationId: string }> },
) {
  const organizationId = (await params).organizationId;

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
