import { db } from "@/lib/db";
import { OrganizationMemberList } from "./organization-member-list";
import { Suspense } from "react";

export const OrganizationMembers = async ({
  organizationId,
}: {
  organizationId: string;
}) => {
  const membersList = await db.organizationMembership.findMany({
    where: {
      organizationId: organizationId,
    },
    include: {
      user: true,
    },
  });
  return (
    <div className="h-full w-full">
      <h1 className="font-semibold my-2 text-xl">Organization members</h1>
      <OrganizationMemberList data={membersList} />
    </div>
  );
};
