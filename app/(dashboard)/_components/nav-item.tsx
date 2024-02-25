"use client";
import { setCurrentOrg } from "@/actions/redis-org/redis-set-current-org";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  Building2,
  Activity,
  CreditCard,
  Layout,
  Settings,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface NavItemProps {
  isActive: boolean;
  isExpanded: boolean;
  onExpand: (id: string) => void;
  organizationName: string;
  organizationId: string;
}

export const NavItem = ({
  organizationName,
  organizationId,
  onExpand,
  isExpanded,
  isActive,
}: NavItemProps) => {
  const router = useRouter();
  const routes = [
    {
      label: "Boards",
      icon: <Layout className="h-4 w-4 mr-2" />,
      href: `/organization/${organizationId}`,
    },
    {
      label: "Activity",
      icon: <Activity className="h-4 w-4 mr-2" />,
      href: `/organization/${organizationId}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className="h-4 w-4 mr-2" />,
      href: `/organization/${organizationId}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className="h-4 w-4 mr-2" />,
      href: `/organization/${organizationId}/billing`,
    },
  ];
  const onClick = (href: string) => {
    setCurrentOrg(organizationId, organizationName).then((res) => {
      if ((res.data.orgId = organizationId)) {
        router.push(href);
      }
    });
  };
  const pathname = usePathname();
  return (
    <>
      <AccordionItem value={organizationId} className="border-none">
        <AccordionTrigger
          onClick={() => onExpand(organizationId)}
          className={cn(
            "flex items-center gap-x-2 p-1.2 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline",
            isActive && !isExpanded && "bg-sky-500/10 text-sky-700",
          )}
        >
          <div className="flex items-center gap-x-2">
            <div className="p-2">
              <Building2 className="text-white bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-300 via-purple-300 to-indigo-400 h-10 border-black rounded-md w-10" />
            </div>
            <span className="font-normal text-sm">{organizationName}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-1 text-neutral-700">
          {routes.map((route) => (
            <Button
              size={"sm"}
              onClick={() => onClick(route.href)}
              className={cn(
                "w-full font-normal justify-start pl-10 mb-1",
                pathname === route.href && "bg-sky-500/10 text-sky-700",
              )}
              key={route.label}
              variant={"ghost"}
            >
              {route.icon}
              {route.label}
            </Button>
          ))}
        </AccordionContent>
      </AccordionItem>
    </>
  );
};

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="w-10 h-10 relative shrink-0">
        <Skeleton className="h-full w-full absolute" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
};
