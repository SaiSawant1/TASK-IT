import { User, Card, List, OrganizationMembership } from "@prisma/client";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type ListWithCards = List & {
  cards: Card[];
};

export type MemberWithUser = OrganizationMembership & {
  user: User;
};

export type CardWithList = Card & {
  list: List;
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};
