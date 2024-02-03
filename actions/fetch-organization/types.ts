import { GetActionState } from "@/lib/create-safe-get-action";
import { Organization } from "@prisma/client";

export type ReturnType = GetActionState<Organization[]>;
