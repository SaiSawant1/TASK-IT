import z from "zod";

export const DeleteListSchema = z.object({
  id: z
    .string({
      required_error: "Image is required",
      invalid_type_error: "Image is required",
    })
    .min(1),
  boardId: z
    .string({
      required_error: "Image is required",
      invalid_type_error: "Image is required",
    })
    .min(1),
});
