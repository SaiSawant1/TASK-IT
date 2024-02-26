"use client";
import { DeleteBoard } from "@/actions/delete-board/index";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import useCurrentOrg from "@/store";
import { MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {
  const { isLoading, execute } = useAction(DeleteBoard, {
    onError: (error) => {
      toast.error(error);
    },
  });
  const ordId = useCurrentOrg((state) => state.organizationId);
  const onDelete = () => {
    execute({ id }, ordId);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant={"transparent"}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-3 " side="bottom" align="start">
        <div className="text-sm text-center font-semibold text-neutral-600 pb-4">
          Board actions
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto p-2 w-auto absolute top-2 right-2 text-neutral-600"
            variant={"ghost"}
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          disabled={isLoading}
          variant={"ghost"}
          onClick={onDelete}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
        >
          Delete this Board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
