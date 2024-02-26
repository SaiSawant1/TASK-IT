"use client";

import { getAllOrgsOfCurrentUser } from "@/actions/fetch-organization";
import { fetchCurrentOrg } from "@/actions/redis-org/redis-fetch-current-org";
import useCurrentOrg from "@/store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useOrganizalitonList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [organization, setOrganization] = useState<
    { orgName: string; orgId: string } | undefined
  >();
  const [error, setError] = useState("");
  const [data, setData] = useState<
    { name: string; id: string }[] | undefined
  >();
  const setOrgName = useCurrentOrg((state) => state.setOrgName);
  const setOrgId = useCurrentOrg((state) => state.setOrgId);
  const { organizationId } = useParams();
  useEffect(() => {
    console.log("useOrgList");
    setIsLoading(true);
    try {
      getAllOrgsOfCurrentUser().then((res) => {
        if (res.data) {
          setData(res.data);
        }
        if (res.error) {
          setError(res.error);
        }
      });
      fetchCurrentOrg().then((res) => {
        if (res.data?.orgId === organizationId) {
          setOrganization(res.data);
          setOrgName(res.data?.orgName);
          setOrgId(res.data?.orgId);
        }
        if (res.error) {
          setError(res.error);
        }
      });
    } catch (_) {
      setError("error while fetching list");
    } finally {
      setIsLoading(false);
    }
  }, [organizationId]);

  return { organization, isLoading, data, error };
};
