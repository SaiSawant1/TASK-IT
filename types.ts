import { Card, List, OrganizationMembership } from "@prisma/client";
import { User } from "next-auth";

export type ListWithCards = List & {
  cards: Card[];
};

export type MemberWithUser = OrganizationMembership & {
  user: User;
};

export type CardWithList = Card & {
  list: List;
};
