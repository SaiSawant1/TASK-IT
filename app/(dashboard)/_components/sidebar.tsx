"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import useCurrentOrg from "@/store";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { NavItem } from "./nav-item";
import { string } from "zod";
import { Separator } from "@/components/ui/separator";
interface SidebarProps {
  storageKey?: string;
}
export const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {},
  );
  const currOrgId = useCurrentOrg((state) => state.organizationId);
  const currOrgName = useCurrentOrg((state) => state.organizationName);
  const organizationList = useCurrentOrg((state) => state.organizationList);
  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    [],
  );
  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };
  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4 text-xl font-semibold">Workspace</span>
        <Button
          className="ml-auto"
          variant={"ghost"}
          size={"icon"}
          type="button"
          asChild
        >
          <Link href={"/organization-select"}>
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {organizationList.map((value) => (
          <NavItem
            key={value.id}
            isActive={value.id === currOrgId}
            onExpand={onExpand}
            isExpanded={expanded[value.id]}
            organizationName={value.name}
            organizationId={value.id}
          />
        ))}
      </Accordion>
    </>
  );
};
