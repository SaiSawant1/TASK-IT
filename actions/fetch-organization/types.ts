import { Organization } from "@prisma/client";

export type OrganizationListReturnType = {
  data?: Organization[];
  error?: string;
};
