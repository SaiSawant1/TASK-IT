import { auth } from "@/auth";
import { CardWrapper } from "../_components/card-warpper";
import { OrganizationList } from "../_components/organization-list";
import { getAllOrganizationOfCurrentUser } from "@/actions/organization";
export default async function OrganizationPage() {
  const session = await auth();

  const { response } = await getAllOrganizationOfCurrentUser(session?.user.id!);

  return (
    <div className="h-full bg-gray-600/70 flex items-center justify-center">
      <CardWrapper headerLabel="Select Organization">
        <OrganizationList OrganizationList={response || []} />
      </CardWrapper>
    </div>
  );
}
