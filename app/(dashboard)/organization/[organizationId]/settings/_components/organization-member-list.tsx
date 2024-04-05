"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { MemberWithUser } from "@/types";
import { OrganizationMember } from "./organizagtion-member";

interface OrganizationMemberListProps {
  data: MemberWithUser[];
}

export const OrganizationMemberList = ({
  data,
}: OrganizationMemberListProps) => {
  return (
    <ScrollArea className="w-full">
      {data.map(({ user, id }) => (
        <OrganizationMember key={id} user={user} />
      ))}
    </ScrollArea>
  );
};
