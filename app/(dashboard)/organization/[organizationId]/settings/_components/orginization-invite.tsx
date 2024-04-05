"use client";
import bcrypt from "bcryptjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Check, Info, Link } from "lucide-react";
import { useState } from "react";
import { date } from "zod";

export const OrganizationInvite = ({
  organizationId,
}: {
  organizationId: string;
}) => {
  const [isCopyClicked, setCopyClicked] = useState(false);
  const { data } = useQuery({
    queryKey: ["organization", organizationId],
    queryFn: async () => {
      const response = await fetch(`/api/organization/${organizationId}`);
      return response.json();
    },
  });

  const onCopy = async () => {
    setCopyClicked(true);
    if (!data) {
      return;
    }
    if (typeof window !== undefined) {
      const hashedToken = await bcrypt.hash(data.token, 10);
      navigator.clipboard.writeText("");
      navigator.clipboard.writeText(
        `http://localhost:3000/invite/${data.id}?token=${hashedToken}`,
      );
    }
    setTimeout(() => {
      setCopyClicked(false);
    }, 5000);
  };

  return (
    <div className="w-full ">
      <h1 className="font-semibold text-xl">Invite members</h1>
      <p className="text-neutral-700 my-3">
        Any one with the invite link can join the Organization
      </p>
      <div className="flex justify-between items-end">
        <div className="text-neutral-700 flex w-96 bg-sky-400/20 space-x-2 p-3">
          <Info className="text-yellow-400  w-6 h-6  rounded-xl text-center font-semibold " />
          <div>
            Click on the invite with link button and copy the invite link to
            click board. Send the link the to invite members to join your
            organization
          </div>
        </div>
        <Button
          onClick={onCopy}
          size={"sm"}
          variant={"none"}
          className={cn("bg-gray-300", isCopyClicked ? "bg-emerald-300" : "")}
        >
          {" "}
          {isCopyClicked ? (
            <Check className="h-4 w-4 text-muted-foreground mx-2" />
          ) : (
            <Link className="h-4 w-4 text-muted-foreground mx-2" />
          )}
          invite with link
        </Button>
      </div>
    </div>
  );
};
