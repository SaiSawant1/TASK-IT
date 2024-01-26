"use client";

import { Button } from "@/components/ui/button";
import { CreateOrgForm } from "./create-org-form";
import { useState } from "react";

export const OrganizationList = () => {
  const [isCreateOrgModalOpen, setCreateOrgModalOpen] = useState(false);
  const closeModal = () => {
    setCreateOrgModalOpen(false);
  };
  const onClick = () => {
    setCreateOrgModalOpen(true);
  };
  return (
    <>
      <div className="flex-col gap-y-2">
        <div> some things</div>
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
