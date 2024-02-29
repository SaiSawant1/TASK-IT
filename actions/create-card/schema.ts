import z from "zod";

export const CreateCardSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, { message: "Title is too short" }),
  boardId: z
    .string({
      required_error: "Image is required",
      invalid_type_error: "Image is required",
    })
    .min(1),
  listId: z
    .string({
      required_error: "Image is required",
      invalid_type_error: "Image is required",
    })
    .min(1),
});
