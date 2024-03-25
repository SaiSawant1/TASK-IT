"use client";

import { fetchCurrentOrg } from "@/actions/redis-org/redis-fetch-current-org";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export const OrganizationControl = () => {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    fetchCurrentOrg().then((res) => {
      if (res.data?.orgId !== params.organizationId) {
        router.push(`/organization-select`);
      }
    });
  }, [params.organizationId, router]);
  return null;
};
