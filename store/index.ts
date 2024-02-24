import { OrganizationList } from "@/app/(dashboard)/_components/organization-list";
import { Board, Organization } from "@prisma/client";
import { create } from "zustand";
interface organization {
  name: string;
  id: string;
}
type State = {
  organizationId: string;
  organizationName: string;
  organizationList: organization[];
  boardList: Board[];
};
type Action = {
  setOrgId: (organizationId: State["organizationId"]) => void;
  setOrgName: (organizationName: State["organizationName"]) => void;
  setOrgList: (organizationList: State["organizationList"]) => void;
  setBoardList: (boardList: State["boardList"]) => void;
};
const useCurrentOrg = create<State & Action>((set) => ({
  organizationId: "",
  organizationName: "",
  organizationList: [],
  boardList: [],
  setOrgId: (organizationId) => set(() => ({ organizationId: organizationId })),
  setOrgName: (organizationName) =>
    set(() => ({ organizationName: organizationName })),
  setOrgList: (organizationList) =>
    set(() => ({
      organizationList: organizationList,
    })),
  setBoardList: (boardList) =>
    set(() => ({
      boardList: boardList,
    })),
}));

export default useCurrentOrg;
