import { User, Card, List, OrganizationMembership } from "@prisma/client";

export type ListWithCards = List & {
  cards: Card[];
};

export type MemberWithUser = OrganizationMembership & {
  user: User;
};

export type CardWithList = Card & {
  list: List;
};
