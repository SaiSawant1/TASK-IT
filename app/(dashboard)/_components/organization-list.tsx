"use client";

import { Button } from "@/components/ui/button";
import { CreateOrgForm } from "./create-org-form";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { BuildingOffice2 } from "@styled-icons/heroicons-outline/BuildingOffice2";
import { Separator } from "@/components/ui/separator";
import useCurrentOrg from "@/store";
import { ArrowRight, Key } from "lucide-react";
import { useOrganizalitonList } from "@/hooks/use-organization-list";

export const OrganizationList = () => {
  const router = useRouter();
  const [isCreateOrgModalOpen, setCreateOrgModalOpen] = useState(false);
  const { isLoading, data } = useOrganizalitonList();
  const closeModal = () => {
    setCreateOrgModalOpen(false);
    router.refresh();
  };
  const onClick = () => {
    setCreateOrgModalOpen(true);
  };
  const setOrgId = useCurrentOrg((state) => state.setOrgId);
  const setOrgName = useCurrentOrg((state) => state.setOrgName);
  const setOrgList = useCurrentOrg((state) => state.setOrgList);

  const handleClick = (values: { id: string; name: string }) => {
    setOrgId(values.id);
    setOrgName(values.name);
    if (OrganizationList.length > 0) {
      setOrgList(data!);
    }
    router.push(`/organization/${values.id}`);
  };

  return (
    <>
      <div className="flex-col w-72 gap-y-2">
        {isLoading || !data ? (
          <>
            <div className="h-full w-full flex flex-row p-3 items-center space-x-2">
              <div className="h-10 w-10 animate-pulse bg-slate-300 rounded-sm"></div>
              <div className="h-10 grow bg-slate-300 rounded-sm animate-pulse"></div>
            </div>
            <Separator />
            <div className="h-full w-full flex flex-row p-3 items-center space-x-2">
              <div className="h-10 w-10 animate-pulse bg-slate-300 rounded-sm"></div>
              <div className="h-10 grow bg-slate-300 rounded-sm animate-pulse"></div>
            </div>
          </>
        ) : (
          <div>
            <ScrollArea className="w-full h-36">
              {data?.map((data) => (
                <div
                  key={data.id}
                  className="cursor-pointer"
                  onClick={() => handleClick(data)}
                >
                  <div className="flex hover:bg-slate-200 transition-all rounded-md p-4 items-center justify-between">
                    <div className="flex gap-x-4 items-center">
                      <BuildingOffice2 className="text-white bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-300 via-purple-300 to-indigo-400 h-10 border-black rounded-md w-10" />
                      <p className="text-xl font-semibold">{data.name}</p>
                    </div>
                    <ArrowRight className="text-gray-500" />
                  </div>
                  <Separator />
                </div>
              ))}
            </ScrollArea>
          </div>
        )}
        <div className="flex overflow-hidden justify-center space-x-3 my-1 items-center">
          <Separator />
          <span>or</span>
          <Separator />
        </div>
        <div className="w-full">
          <Button onClick={onClick} className="w-full">
            Create New Organization
          </Button>
        </div>
      </div>
      <CreateOrgForm
        isModalOpen={isCreateOrgModalOpen}
        setModalClose={closeModal}
      />
    </>
  );
};
