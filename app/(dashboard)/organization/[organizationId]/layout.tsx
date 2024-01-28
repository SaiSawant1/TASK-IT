import { getAllOrganizationOfCurrentUser } from "@/actions/organization";
import { OrganizationControl } from "./_components/organization-control";
import { auth } from "@/auth";

interface OrganizationIdLayoutProps {
  children: React.ReactNode;
}

export default async function OrganizationIdLayout({
  children,
}: OrganizationIdLayoutProps) {
  const session = await auth();

  if (!session?.user.id) {
    return null;
  }

  const { response } = await getAllOrganizationOfCurrentUser(session?.user.id);

  return (
    <>
      <OrganizationControl list={response || []} />
      {children}
    </>
  );
}
