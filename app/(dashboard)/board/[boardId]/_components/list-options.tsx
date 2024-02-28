import { ListWithCards } from "@/types";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { FormSubmit } from "@/components/form/form-submit";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { DeleteList } from "@/actions/delete-list";
import useCurrentOrg from "@/store";
import { toast } from "sonner";
import { ElementRef, useRef } from "react";
import { CopyList } from "@/actions/copy-list";

interface ListOptionsProps {
  data: ListWithCards;
  onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const orgId = useCurrentOrg((state) => state.organizationId);
  const closeRef = useRef<ElementRef<"button">>(null);
  const { execute: executeDelete, isLoading: isDeleting } = useAction(
    DeleteList,
    {
      onSuccess: (data) => {
        toast.success(`List ${data.title} deleted`);
        closeRef.current?.click();
      },
      onError: (err) => {
        toast.error(`Failed to delete ${err}`);
      },
    },
  );

  const { execute: executeCopy, isLoading: isCopying } = useAction(CopyList, {
    onSuccess: (data) => {
      toast.success(`copied list ${data.title}`);
      closeRef.current?.click();
    },
    onError: (err) => {
      toast.error(`something went wrong ${err}`);
    },
  });

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    executeCopy({ id, boardId }, orgId);
  };

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    executeDelete({ id, boardId }, orgId);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant={"ghost"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List Actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            size={"sm"}
            variant={"transparent"}
          >
            <X className="h-4 w-4 " />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto justify-start font-normal text-sm p-2 px-5"
          variant={"ghost"}
        >
          Add card...
        </Button>
        <form action={onCopy}>
          <input
            disabled={isCopying}
            id="id"
            name="id"
            hidden
            value={data.id}
          />
          <input
            disabled={isCopying}
            id="boardId"
            name="boardId"
            hidden
            value={data.boardId}
          />
          <FormSubmit
            disabled={isCopying}
            className="rounded-none w-full h-auto justify-start font-normal text-sm p-2 px-5"
            variant="ghost"
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input
            disabled={isDeleting}
            id="id"
            name="id"
            hidden
            value={data.id}
          />
          <input
            disabled={isDeleting}
            id="boardId"
            name="boardId"
            hidden
            value={data.boardId}
          />
          <FormSubmit
            disabled={isDeleting}
            className="rounded-none w-full h-auto justify-start font-normal text-sm p-2 px-5"
            variant="ghost"
          >
            Delete this list...
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
