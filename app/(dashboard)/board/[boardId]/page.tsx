import { fetchCurrentOrg } from "@/actions/redis-org/redis-fetch-current-org";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ListContainer } from "./_components/list-container";

interface BoardIdPageProps {
  params: Promise<{ boardId: string }>;
}

export default async function BoardIdPage({ params }: BoardIdPageProps) {
  const { data } = await fetchCurrentOrg();
  const boardId = (await params).boardId;

  if (!data?.orgId) {
    redirect("/organization-select");
  }

  const lists = await db.list.findMany({
    where: {
      boardId,
      board: {
        orgId: data.orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="h-full overflow-x-auto p-4 ">
      <ListContainer boardId={boardId} data={lists} />
    </div>
  );
}
