import { CardWrapper } from "../_components/card-warpper";
import { OrganizationList } from "../_components/oranization-list";

export default function OrganizationPage() {
  return (
    <div className="h-full bg-gray-600/70 flex items-center justify-center">
      <CardWrapper headerLabel="Select Organization">
        <OrganizationList />
      </CardWrapper>
    </div>
  );
}
