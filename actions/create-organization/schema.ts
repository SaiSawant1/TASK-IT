import z from "zod";

export const CreateOrganization = z.object({
  title: z
    .string({
      required_error: "Organization name required",
      invalid_type_error: "Organization name required",
    })
    .min(3, { message: "Organization is title is too short" }),
});
