import { fetchCurrentOrg } from "@/actions/redis-org/redis-fetch-current-org";
import { ActivityItem } from "@/components/activity-item";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export const ActivityList = async () => {
  const { data } = await fetchCurrentOrg();
  if (!data || !data?.orgId) {
    redirect("/select-org");
  }

  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId: data.orgId,
    },
  });
  return (
    <ol className="space-y-4 my-4">
      <p className="hidden last:block text-xs text-muted-foreground text-center">
        No Activity found inside this organization
      </p>
      {auditLogs.map((item) => (
        <ActivityItem key={item.id} item={item} />
      ))}
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 my-4">
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[50%] h-14" />
      <Skeleton className="w-[70%] h-14" />
      <Skeleton className="w-[40%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[70%] h-14" />
      <Skeleton className="w-[60%] h-14" />
      <Skeleton className="w-[80%] h-14" />
    </ol>
  );
};
