import { CardWrapper } from "@/app/(dashboard)/_components/card-warpper";
import { OrganizationList } from "@/app/(dashboard)/_components/organization-list";
export default function OrganizationSelectPage() {
  return (
    <div className="h-full w-full bg-gray-200/55 flex items-center justify-center">
      <CardWrapper headerLabel="Select Organization">
        <OrganizationList />
      </CardWrapper>
    </div>
  );
}
