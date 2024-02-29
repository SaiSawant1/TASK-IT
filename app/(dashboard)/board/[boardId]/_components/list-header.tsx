import { ListUpdate } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import useCurrentOrg from "@/store";
import { ListWithCards } from "@/types";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import { ListOptions } from "./list-options";

interface ListHeaderProps {
  data: ListWithCards;
  onAddCard: () => void;
}

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const { execute, isLoading, fieldErrors } = useAction(ListUpdate, {
    onSuccess: (data) => {
      disableEditing();
      setTitle(data.title);
      toast.success(`board name updated to ${data.title}`);
    },
    onError: (error) => {
      toast.error(`some thing went wrong ${error}`);
    },
  });

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const orgId = useCurrentOrg((state) => state.organizationId);

  const onSubmit = (formData: FormData) => {
    const id = formData.get("id") as string;
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    if (title == data.title) {
      disableEditing();
    }

    execute({ id, title, boardId }, orgId);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  useEventListener("keydown", onKeyDown);

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form action={onSubmit} ref={formRef} className="flex-1 px-[2px]">
          <input hidden id="id" name="id" value={data.id} />
          <input hidden id="boardId" name="boardId" value={data.boardId} />
          <FormInput
            disabled={isLoading}
            errors={fieldErrors}
            id="title"
            ref={inputRef}
            placeholder={"Enter list title.."}
            defaultValue={data.title}
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
            onBlur={onBlur}
          />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {title}
        </div>
      )}
      <ListOptions data={data} onAddCard={onAddCard} />
    </div>
  );
};
