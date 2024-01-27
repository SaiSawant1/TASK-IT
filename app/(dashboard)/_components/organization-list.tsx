"use client";

import { Button } from "@/components/ui/button";
import { CreateOrgForm } from "./create-org-form";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { BuildingOffice2 } from "@styled-icons/heroicons-outline/BuildingOffice2";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
interface OrganizationListProps {
  OrganizationList: { name: string; id: string }[];
}

export const OrganizationList = ({
  OrganizationList,
}: OrganizationListProps) => {
  const router = useRouter();
  const [isCreateOrgModalOpen, setCreateOrgModalOpen] = useState(false);
  const closeModal = () => {
    setCreateOrgModalOpen(false);
    router.refresh();
  };
  const onClick = () => {
    setCreateOrgModalOpen(true);
  };
  return (
    <>
      <div className="flex-col w-72 gap-y-2">
        <div>
          <ScrollArea className="w-full h-36">
            {OrganizationList.map((data) => (
              <>
                <Link href={`/organization/${data.id}`}>
                  <div
                    key={data.id}
                    className="flex hover:bg-slate-200 transition-all rounded-md p-4 items-center justify-between"
                  >
                    <BuildingOffice2 className="bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-300 via-purple-300 to-indigo-400 h-10 border-black rounded-md w-10" />
                    <p className="text-xl font-semibold">{data.name}</p>
                  </div>
                </Link>
                <Separator />
              </>
            ))}
          </ScrollArea>
        </div>
        <div className="flex justify-center items-center">
          <span className="h-0.5 bg-gray-600 w-full" />
          or <span className="h-0.5 bg-gray-600 w-full" />
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
