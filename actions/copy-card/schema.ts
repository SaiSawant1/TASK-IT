import z from "zod";

export const CopyCardSchema = z.object({
  id: z.string().min(1),
  boardId: z.string().min(1),
});
