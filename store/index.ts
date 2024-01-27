import { OrganizationList } from "@/app/(dashboard)/_components/organization-list";
import { Organization } from "@prisma/client";
import { create } from "zustand";
interface organization {
  name: string;
  id: string;
}
type State = {
  organizationId: string;
  organizationName: string;
  organizationList: organization[];
};
type Action = {
  setOrgId: (organizationId: State["organizationId"]) => void;
  setOrgName: (organizationName: State["organizationName"]) => void;
  setOrgList: (organizationList: State["organizationList"]) => void;
};
const useCurrentOrg = create<State & Action>((set) => ({
  organizationId: "",
  organizationName: "",
  organizationList: [],
  setOrgId: (organizationId) => set(() => ({ organizationId: organizationId })),
  setOrgName: (organizationName) =>
    set(() => ({ organizationName: organizationName })),
  setOrgList: (organizationList) =>
    set(() => ({
      organizationList: organizationList,
    })),
}));

export default useCurrentOrg;
