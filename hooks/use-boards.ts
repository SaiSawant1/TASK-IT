"use client";

import { getBoards } from "@/actions/get-boards";
import { Board } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useBoards = () => {
  const params = useParams();

  const [boards, setBoards] = useState<Board[] | undefined>();

  useEffect(() => {
    if (!params?.organizationId) {
      return;
    }
    if (Array.isArray(params?.organizationId)) {
      return;
    }
    getBoards(params?.organizationId).then((res) => {
      if (res.data) {
        setBoards(res.data);
      }
    });
  }, [params?.organizationId]);

  return { boards };
};
