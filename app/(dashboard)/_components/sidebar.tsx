"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { NavItem } from "./nav-item";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganizalitonList } from "@/hooks/use-organization-list";
import { useEffect } from "react";
import { useParams } from "next/navigation";
interface SidebarProps {
  storageKey?: string;
}
export const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {},
  );

  const { isLoading, error, organization, data } = useOrganizalitonList();
  const { organizationId } = useParams();
  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    [],
  );
  useEffect(() => {}, [organization]);
  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (isLoading || !organization || !data) {
    return (
      <>
        <div className="flex  items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }

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
        {data?.map((value) => (
          <NavItem
            key={value.id}
            isActive={value.id === organizationId}
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
