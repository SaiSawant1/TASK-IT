"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import useCurrentOrg from "@/store";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { NavItem } from "./nav-item";
import { useEffect, useState } from "react";
import { getAllOrgsOfCurrentUser } from "@/actions/fetch-organization";
import { Organization } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
interface SidebarProps {
  storageKey?: string;
}
export const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {},
  );

  const [data, setData] = useState<Organization[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");

  const currOrgId = useCurrentOrg((state) => state.organizationId);
  useEffect(() => {
    setIsLoading(true);
    try {
      getAllOrgsOfCurrentUser().then((value) => {
        setData(value.data);
        setError(value.error);
      });
    } finally {
      setIsLoading(false);
    }
  }, [data, isLoading]);
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
  if (!data) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
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
