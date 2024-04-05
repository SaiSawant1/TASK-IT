import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User } from "next-auth";

interface OrganizationMemberProps {
  user: User;
}

export const OrganizationMember = ({ user }: OrganizationMemberProps) => {
  return (
    <div className="my-2 w-full">
      <div className="flex justify-between">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={user.image!} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-semibold">{user.name}</p>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant={"primary"} size={"sm"}>
            Admin
          </Button>
          <Button variant={"destructive"} size={"sm"}>
            Kick Out
          </Button>
        </div>
      </div>
      <Separator className="my-2" />
    </div>
  );
};
