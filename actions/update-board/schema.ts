import z from "zod";

export const UpdateBoardSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, { message: "Title is too short" }),
  id: z
    .string({
      required_error: "Image is required",
      invalid_type_error: "Image is required",
    })
    .min(1),
});
