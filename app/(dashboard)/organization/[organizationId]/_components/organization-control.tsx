"use client";

import { useOrganizalitonList } from "@/hooks/use-organization-list";
import useCurrentOrg from "@/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export const OrganizationControl = () => {
  const params = useParams();
  const router = useRouter();
  const setOrgId = useCurrentOrg((state) => state.setOrgId);
  const setOrgName = useCurrentOrg((state) => state.setOrgName);
  const setOrgList = useCurrentOrg((state) => state.setOrgList);
  const { data } = useOrganizalitonList();

  useEffect(() => {
    data?.forEach((item) => {
      if (item.id === params.organizationId) {
        setOrgId(item.id);
        setOrgName(item.name);
        setOrgList(data);
        router.push(`/organization/${item.id}`);
      }
    });
  }, [data, router, params.organizationId, setOrgId, setOrgList, setOrgName]);
  return null;
};
