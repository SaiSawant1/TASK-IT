"use client";

import useCurrentOrg from "@/store";
import { BuildingOffice2 } from "@styled-icons/heroicons-outline/BuildingOffice2";
import { CreditCard } from "lucide-react";
export const Info = () => {
  const { organizationName, organizationId } = useCurrentOrg();
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <BuildingOffice2 className="text-white h-full w-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-300 via-purple-300 to-indigo-400  border-black rounded-md " />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-xl">{organizationName}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="h-3 w-3 mr-2" />
          Free
        </div>
      </div>
    </div>
  );
};
