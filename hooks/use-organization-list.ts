"use client";

import { getAllOrgsOfCurrentUser } from "@/actions/fetch-organization";
import { useEffect, useState } from "react";

export const useOrganizalitonList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<
    { name: string; id: string }[] | undefined
  >();

  useEffect(() => {
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
    } catch (_) {
      setError("error while fetching list");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, data, error };
};
