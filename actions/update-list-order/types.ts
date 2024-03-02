import { z } from "zod";
import { ActionState } from "@/lib/create-safe-action";
import { UpdateListOrderSchema } from "./schema";
import { List } from "@prisma/client";

export type InputType = z.infer<typeof UpdateListOrderSchema>;
export type ReturnType = ActionState<InputType, List[]>;
