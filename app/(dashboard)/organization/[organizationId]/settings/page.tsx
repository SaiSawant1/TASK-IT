import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info";
import { OrganizationInvite } from "./_components/orginization-invite";

export default async function SettingsPage({
  params,
}: {
  params: { organizationId: string };
}) {
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-2" />
      <OrganizationInvite organizationId={params.organizationId} />
    </div>
  );
}
