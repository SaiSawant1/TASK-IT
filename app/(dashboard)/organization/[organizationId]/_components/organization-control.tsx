"use client";

import { fetchCurrentOrg } from "@/actions/redis-org/redis-fetch-current-org";
import { setCurrentOrg } from "@/actions/redis-org/redis-set-current-org";
import { useOrganizalitonList } from "@/hooks/use-organization-list";
import useCurrentOrg from "@/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export const OrganizationControl = () => {
  const params = useParams();
  const setOrgId = useCurrentOrg((state) => state.setOrgId);
  const setOrgName = useCurrentOrg((state) => state.setOrgName);
  const orgName = useCurrentOrg((state) => state.organizationName);
  const router = useRouter();

  useEffect(() => {
    fetchCurrentOrg().then((res) => {
      if (res.data?.orgId !== params.organizationId) {
        router.push(`/organization-select`);
      }
    });
  }, [params.organizationId]);
  return null;
};
