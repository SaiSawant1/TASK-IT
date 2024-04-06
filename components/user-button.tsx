"use client";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Separator } from "./ui/separator";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const UserButton = () => {
  const router = useRouter();
  const { data } = useSession();
  const email = data?.user.email?.slice(0, 9) + "...";
  const handleClick = () => {
    signOut();
  };

  const onClickSetting = () => {
    router.push(`/user/settings`);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar>
          <AvatarImage src={data?.user.image!} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="flex flex-col space-y-2">
          <div className="px-2 flex items-center justify-between">
            <p className="font-bold">User</p>
            <p className="font-semibold">{data?.user.name}</p>
          </div>
          <Separator />
          <div className="px-2 flex items-center justify-between">
            <p className="font-bold">Email</p>
            <p className="font-semibold">{email}</p>
          </div>
          <Separator />
          <Button
            onClick={onClickSetting}
            className="px-2 flex items-center justify-between"
          >
            <p className="font-bold">settings</p>
            <GearIcon className="h-5 w-5" />
          </Button>
          <Separator />
          <Button
            variant={"outline"}
            className="px-2 flex items-center justify-between"
            onClick={handleClick}
          >
            <p className="font-bold text-red-800">Sign Out</p>
            <ExitIcon className=" text-red-800 h-5 w-5" />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
