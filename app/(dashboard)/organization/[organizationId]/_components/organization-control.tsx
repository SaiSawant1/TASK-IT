"use client";

import useCurrentOrg from "@/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

interface OrganizationControlProps {
  list: { name: string; id: string }[];
}

export const OrganizationControl = ({ list }: OrganizationControlProps) => {
  const params = useParams();

  const router = useRouter();
  const setOrgId = useCurrentOrg((state) => state.setOrgId);
  const setOrgName = useCurrentOrg((state) => state.setOrgName);
  const setOrgList = useCurrentOrg((state) => state.setOrgList);
  useEffect(() => {
    list?.forEach((item) => {
      if (item.id === params.organizationId) {
        setOrgId(item.id);
        setOrgName(item.name);
        setOrgList(list);
        router.push(`/organization/${item.id}`);
      }
    });
  }, [params.organizationId, list, router, setOrgList, setOrgName, setOrgId]);
  return null;
};
