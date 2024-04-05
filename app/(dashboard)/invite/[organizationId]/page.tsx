import { CreateNewMembership } from "@/actions/create-new-membership";
import { auth } from "@/auth";
import { ServerCrash } from "lucide-react";
import { redirect } from "next/navigation";

export default async function InvitePage({
  params,
  searchParams,
}: {
  params: { organizationId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();
  if (!searchParams.token) {
    redirect("/login");
  }

  if (!session?.user.id) {
    redirect("/login");
  }
  const newMembership = await CreateNewMembership({
    organizationId: params.organizationId,
    userId: session?.user.id,
    token: searchParams.token as string,
  });
  if (newMembership.data) {
    redirect(`/organization/${newMembership.data.organizationId}`);
  }
  if (newMembership.error) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="bg-destructive-foreground">
          <ServerCrash className="bg-red-900" />
          Something went wrong! Failed to Join Organization
        </div>
      </div>
    );
  }
}
