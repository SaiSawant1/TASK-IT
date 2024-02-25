import { fetchCurrentOrg } from "@/actions/redis-org/redis-fetch-current-org";
import { CreditCard, Building2 } from "lucide-react";

export const Info = async () => {
  const { data } = await fetchCurrentOrg();
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Building2 className="text-white h-full w-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-300 via-purple-300 to-indigo-400  border-black rounded-md " />
      </div>
      <div className="space-y-1">
        {data ? (
          <p className="font-semibold text-xl">{data.orgName}</p>
        ) : (
          <p className="h-6 rounded-sm w-full animate-pulse bg-slate-200"></p>
        )}
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="h-3 w-3 mr-2" />
          Free
        </div>
      </div>
    </div>
  );
};
