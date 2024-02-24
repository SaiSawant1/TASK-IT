"use client";

import { getBoards } from "@/actions/get-boards";
import { Board } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useBoards = () => {
  const { organizationId } = useParams();

  const [boards, setBoards] = useState<Board[] | undefined>();

  useEffect(() => {
    if (!organizationId) {
      return;
    }
    if (Array.isArray(organizationId)) {
      return;
    }
    getBoards(organizationId).then((res) => {
      if (res.data) {
        setBoards(res.data);
      }
    });
  }, [organizationId]);

  return { boards };
};
