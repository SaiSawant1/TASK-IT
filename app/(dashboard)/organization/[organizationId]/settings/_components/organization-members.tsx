import { OrganizationMemberList } from "./organization-member-list";
import { Suspense } from "react";

export const OrganizationMembers = async ({
  organizationId,
}: {
  organizationId: string;
}) => {
  return (
    <div className="h-full w-full">
      <h1 className="font-semibold my-2 text-xl">Organization members</h1>
      <Suspense fallback={OrganizationMemberList.Skeleton()}>
        <OrganizationMemberList organizationId={organizationId} />
      </Suspense>
    </div>
  );
};
