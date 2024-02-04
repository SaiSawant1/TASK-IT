import { Organization } from "@prisma/client";

export type ReturnType = {
  data?: Organization[];
  error?: string;
};
