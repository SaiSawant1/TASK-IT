"use client";
import { UpdateMembershipRole } from "@/actions/update-membership-role";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import useCurrentOrg from "@/store";
import { User, UserRole } from "@prisma/client";
import { Shield } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface OrganizationMemberProps {
  user: User;
  role: UserRole;
  organizationId: string;
  id: string;
}

export const OrganizationMember = ({
  organizationId,
  id,
  user,
  role,
}: OrganizationMemberProps) => {
  const { execute } = useAction(UpdateMembershipRole, {
    onSuccess: (_) => {
      toast.success(`Updated Role of the user`);
    },
    onError: (_) => {
      toast.error(`failed to update role`);
    },
  });
  const [isMounted, setIsMounted] = useState(false);
  const orgId = useCurrentOrg((state) => state.organizationId);

  const onAssignAdmin = () => {
    execute(
      {
        organizationId,
        membershipId: id,
        userId: user.id,
        role: UserRole.ADMIN,
      },
      orgId,
    );
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return;
  }
  return (
    <div className="my-2 w-full">
      <div className="flex justify-between">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={user.image!} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-semibold">
              {user.name}
              {role === UserRole.ADMIN && (
                <Badge variant={"destructive"} className="mx-2">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin
                </Badge>
              )}
            </p>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {role !== UserRole.ADMIN && (
            <Button onClick={onAssignAdmin} variant={"primary"} size={"sm"}>
              Assign as Admin
            </Button>
          )}
          <Button
            disabled={role === UserRole.ADMIN}
            variant={"destructive"}
            size={"sm"}
          >
            Kick Out
          </Button>
        </div>
      </div>
      <Separator className="my-2" />
    </div>
  );
};
