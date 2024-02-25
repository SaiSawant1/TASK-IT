"use client";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useCurrentOrg from "@/store";
import { OrganizationList } from "./organization-list";
import { ChevronsUpDown, Building2 } from "lucide-react";
import { useEffect } from "react";
import { fetchCurrentOrg } from "@/actions/redis-org/redis-fetch-current-org";
export const OrganizationSwitcher = () => {
  const currentOrganizationName = useCurrentOrg(
    (state) => state.organizationName,
  );
  const setOrgName = useCurrentOrg((state) => state.setOrgName);
  const setOrgId = useCurrentOrg((state) => state.setOrgId);
  useEffect(() => {
    if (currentOrganizationName === "") {
      fetchCurrentOrg().then((res) => {
        if (res.data?.orgId && res.data.orgName) {
          setOrgId(res.data.orgId);
          setOrgName(res.data.orgName);
        }
      });
    }
  }, [currentOrganizationName]);

  return (
    currentOrganizationName !== "" && (
      <Popover>
        <PopoverTrigger asChild>
          <div className="border-gray-400 rounded-md border-2">
            <div className="cursor-pointer">
              <div className="flex hover:bg-slate-200 transition-all space-x-3 rounded-md py-2 px-4 items-center justify-between">
                <Building2 className="text-white bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-300 via-purple-300 to-indigo-400 h-6 border-black rounded-md w-6" />
                <p className="text-xl pr-7 font-semibold">
                  {currentOrganizationName}
                </p>
                <ChevronsUpDown />
              </div>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80">
          <OrganizationList />
        </PopoverContent>
      </Popover>
    )
  );
};
