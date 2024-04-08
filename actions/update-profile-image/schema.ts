import z from "zod";

export const UpdateProfileImageSchema = z.object({
  userId: z
    .string({
      required_error: "user id is required",
      invalid_type_error: "user id is required",
    })
    .min(1),
  imageUrl: z
    .string({
      required_error: "image url is required",
      invalid_type_error: "image url is required",
    })
    .min(1),
});
