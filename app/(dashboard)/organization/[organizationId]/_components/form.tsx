"use client";
import { createBoard } from "@/actions/create-board";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-action";

export const Form = () => {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const handleSubmit = (data: FormData) => {
    const title = data.get("title") as string;
    if (title) {
      execute({ title });
    }
  };

  return (
    <form action={handleSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput id="title" errors={fieldErrors} label="Board Title" />
      </div>
      <FormSubmit>Submit</FormSubmit>
    </form>
  );
};
