"use client";

import { CopyCard } from "@/actions/copy-card";
import { DeleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useAction } from "@/hooks/use-action";
import { useCardModal } from "@/hooks/use-card-modal";
import useCurrentOrg from "@/store";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ActionsProps {
  data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
  const cardModal = useCardModal();
  const [isLoading, setLoading] = useState(false);
  const { execute: ExecuteCardCopy } = useAction(CopyCard, {
    onSuccess: (data) => {
      toast.success(`${data.title} Card copied`);
      setLoading(false);
    },
    onError: (err) => {
      toast.error(`failed to copy Card ${err}`);
      setLoading(false);
    },
  });
  const { execute: ExecuteDeleteCard } = useAction(DeleteCard, {
    onSuccess: (data) => {
      toast.success(`${data.title} Card Deleted`);
      setLoading(false);
      cardModal.onClose();
    },
    onError: (err) => {
      toast.error(`failed to Delete Card ${err}`);
      setLoading(false);
    },
  });
  const orgId = useCurrentOrg((state) => state.organizationId);
  const params = useParams();

  const onCopy = () => {
    setLoading(true);
    const id = data.id;
    const boardId = params?.boardId as string;
    ExecuteCardCopy({ id, boardId }, orgId);
  };
  const onDelete = () => {
    setLoading(true);
    const id = data.id;
    const boardId = params?.boardId as string;
    ExecuteDeleteCard({ id, boardId }, orgId);
  };
  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        onClick={onCopy}
        variant={"gray"}
        className="w-full justify-start"
        size={"inline"}
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Copy className="h-4 w-4 mr-2" />
            Copy
          </>
        )}
      </Button>
      <Button
        disabled={isLoading}
        onClick={onDelete}
        variant={"gray"}
        className="w-full justify-start"
        size={"inline"}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </>
        )}
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
