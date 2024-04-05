import { ScrollArea } from "@/components/ui/scroll-area";
import { MemberWithUser } from "@/types";
import { OrganizationMember } from "./organizagtion-member";
import { db } from "@/lib/db";

interface OrganizationMemberListProps {
  organizationId: string;
}

export const OrganizationMemberList = async ({
  organizationId,
}: OrganizationMemberListProps) => {
  const data: MemberWithUser[] = await db.organizationMembership.findMany({
    where: {
      organizationId: organizationId,
    },
    include: {
      user: true,
    },
  });
  return (
    <ScrollArea className="w-full">
      {data.map(({ user, id, role }) => (
        <OrganizationMember
          organizationId={organizationId}
          key={id}
          role={role}
          id={id}
          user={user}
        />
      ))}
    </ScrollArea>
  );
};

OrganizationMemberList.Skeleton = function OrganizationMemberListSkeleton() {
  return <div>Loading...</div>;
};
