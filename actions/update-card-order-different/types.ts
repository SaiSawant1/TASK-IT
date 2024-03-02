import { z } from "zod";
import { ActionState } from "@/lib/create-safe-action";
import { UpdateCardOrderInDifferenListSchema } from "./schema";
import { Card } from "@prisma/client";

export type InputType = z.infer<typeof UpdateCardOrderInDifferenListSchema>;
export type ReturnType = ActionState<InputType, Card[]>;
