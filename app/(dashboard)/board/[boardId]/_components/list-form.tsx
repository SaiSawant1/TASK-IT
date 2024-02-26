"use client";

import { Plus, X } from "lucide-react";
import { ListWrapper } from "./list-wrapper";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { useParams, useRouter } from "next/navigation";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { CreateList } from "@/actions/create-list";
import { toast } from "sonner";
import useCurrentOrg from "@/store";

export const ListForm = () => {
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const router = useRouter();

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { isLoading, execute, fieldErrors } = useAction(CreateList, {
    onSuccess: (data) => {
      toast.success(`List : ${data.title} created`);
      disableEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(`something went wrong. Error: ${error}`);
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  const orgId = useCurrentOrg((state) => state.organizationId);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    if (title && boardId) {
      execute({ title, boardId }, orgId);
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white shadow-md space-y-4 "
        >
          <FormInput
            errors={fieldErrors}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition"
            ref={inputRef}
            placeholder="Enter List Title"
          />
          <input hidden value={params.boardId} name="boardId" />
          <div className="flex items-center gap-x-1 ">
            <FormSubmit>Add List</FormSubmit>
            <Button onClick={disableEditing} size={"sm"} variant={"ghost"}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full rounded-md bg-white/80 hover:bg-white/30 transition p-3 flex items-center font-medium text-sm"
      >
        <Plus className="h-4 mr-2 w-4" />
        Add a List
      </button>
    </ListWrapper>
  );
};
