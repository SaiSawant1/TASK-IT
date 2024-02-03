import { z } from "zod";
import { CreateOrganization } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Organization } from "@prisma/client";

export type InputType = z.infer<typeof CreateOrganization>;
export type ReturnType = ActionState<InputType, Organization>;
