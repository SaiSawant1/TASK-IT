import { UserRole } from "@prisma/client";
import z from "zod";

export const UpdateMembershipRoleSchema = z.object({
  organizationId: z
    .string({
      required_error: "Organization Id Required",
      invalid_type_error: "Organization Id Required",
    })
    .min(1),
  membershipId: z
    .string({
      required_error: "Organization Id Required",
      invalid_type_error: "Organization Id Required",
    })
    .min(1),
  userId: z
    .string({
      required_error: "Organization Id Required",
      invalid_type_error: "Organization Id Required",
    })
    .min(1),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
});
