import { auth } from "@/auth";
import { CardWrapper } from "@/app/(dashboard)/_components/card-warpper";
import { OrganizationList } from "@/app/(dashboard)/_components/organization-list";
import { getAllOrganizationOfCurrentUser } from "@/actions/organization";
export default async function OrganizationSelectPage() {
  const session = await auth();

  const { response } = await getAllOrganizationOfCurrentUser(session?.user.id!);

  return (
    <div className="h-full w-full bg-gray-400 flex items-center justify-center">
      <CardWrapper headerLabel="Select Organization">
        <OrganizationList OrganizationList={response || []} />
      </CardWrapper>
    </div>
  );
}
