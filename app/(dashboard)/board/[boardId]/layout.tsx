import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { BoardNavbar } from "./_components/board-navbar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ boardId: string }>;
}) {
  const board = await db.board.findUnique({
    where: {
      id: (await params).boardId,
    },
  });

  return {
    title: board?.title || "Board",
  };
}
interface BoardIdLayoutProps {
  children: React.ReactNode;
  params: Promise<{ boardId: string }>;
}
export default async function BoardIdLayout({
  children,
  params,
}: BoardIdLayoutProps) {
  const board = await db.board.findUnique({
    where: {
      id: (await params).boardId,
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
      <main className="relative  pt-28 h-full">{children}</main>
    </div>
  );
}
