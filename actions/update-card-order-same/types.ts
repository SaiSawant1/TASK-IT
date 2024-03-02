import { z } from "zod";
import { ActionState } from "@/lib/create-safe-action";
import { UpdateCardOrderInSameListSchema } from "./schema";
import { Card } from "@prisma/client";

export type InputType = z.infer<typeof UpdateCardOrderInSameListSchema>;
export type ReturnType = ActionState<InputType, Card[]>;
