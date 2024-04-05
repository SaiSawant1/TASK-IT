import z from "zod";
import { UpdateMembershipRoleSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { OrganizationMembership } from "@prisma/client";

export type InputType = z.infer<typeof UpdateMembershipRoleSchema>;
export type ReturnType = ActionState<InputType, OrganizationMembership>;
