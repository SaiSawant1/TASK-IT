import z from "zod";
import { UpdateProfileImageSchema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { User } from "@prisma/client";

export type InputType = z.infer<typeof UpdateProfileImageSchema>;

export type ReturnType = ActionState<InputType, User>;
