import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { BoardNavbar } from "./_components/board-navbar";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
    },
  });

  return {
    title: board?.title || "Board",
  };
}
interface BoardIdLayoutProps {
  children: React.ReactNode;
  params: { boardId: string };
}
export default async function BoardIdLayout({
  children,
  params: { boardId },
}: BoardIdLayoutProps) {
  const board = await db.board.findUnique({
    where: {
      id: boardId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
      className="relative h-full bg-cover bg-no-repeat bg-center"
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
}
