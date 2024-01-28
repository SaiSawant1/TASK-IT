"use client";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useCurrentOrg from "@/store";
import { BuildingOffice2 } from "@styled-icons/heroicons-outline/BuildingOffice2";
import { OrganizationList } from "./organization-list";
import { ChevronsUpDown } from "lucide-react";
import { useEffect } from "react";
export const OrganizationSwitcher = () => {
  const router = useRouter();
  const currentOrganizationName = useCurrentOrg(
    (state) => state.organizationName,
  );
  useEffect(() => {
    if (currentOrganizationName === "") {
      router.push("/organization-select");
      return;
    }
  }, [currentOrganizationName, router]);

  const list = useCurrentOrg((state) => state.organizationList);
  return (
    currentOrganizationName !== "" && (
      <Popover>
        <PopoverTrigger asChild>
          <div className="border-gray-400 rounded-md border-2">
            <div className="cursor-pointer">
              <div className="flex hover:bg-slate-200 transition-all space-x-3 rounded-md py-2 px-4 items-center justify-between">
                <BuildingOffice2 className="bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-300 via-purple-300 to-indigo-400 h-6 border-black rounded-md w-6" />
                <p className="text-xl pr-7 font-semibold">
                  {currentOrganizationName}
                </p>
                <ChevronsUpDown />
              </div>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80">
          <OrganizationList OrganizationList={list} />
        </PopoverContent>
      </Popover>
    )
  );
};
