import z from "zod";

export const DeleteBoardSchema = z.object({
  id: z
    .string({
      required_error: "Image is required",
      invalid_type_error: "Image is required",
    })
    .min(1),
});
