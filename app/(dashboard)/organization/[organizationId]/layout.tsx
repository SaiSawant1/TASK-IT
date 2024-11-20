import { startCase } from "lodash";
import { OrganizationControl } from "./_components/organization-control";
import { auth } from "@/auth";
import { db } from "@/lib/db";

interface OrganizationIdLayoutProps {
  children: React.ReactNode;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const organization = await db.organization.findUnique({
    where: {
      id: (await params).organizationId,
    },
  });
  return {
    title: startCase(organization?.name || "organization"),
  };
}

export default async function OrganizationIdLayout({
  children,
}: OrganizationIdLayoutProps) {
  const session = await auth();

  if (!session?.user.id) {
    return null;
  }

  return (
    <>
      <OrganizationControl />
      {children}
    </>
  );
}
