import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info";
import { OrganizationInvite } from "./_components/orginization-invite";
import { OrganizationMembers } from "./_components/organization-members";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  return (
    <div className="w-full">
      <Info />
      <Separator className="my-2" />
      <OrganizationInvite organizationId={(await params).organizationId} />
      <Separator className="my-2" />
      <OrganizationMembers organizationId={(await params).organizationId} />
    </div>
  );
}
