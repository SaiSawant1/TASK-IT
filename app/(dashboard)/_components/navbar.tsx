import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OrganizationSwitcher } from "./organization-switcher";
import { UserButton } from "@/components/user-button";
import { MobileSidebar } from "./mobile-sidebar";
import { FormPopOver } from "@/components/form/form-popover";
export const Navbar = () => {
  return (
    <nav className="fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center">
      <MobileSidebar />
      <div className="flex items-center  gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <FormPopOver side="bottom" sideOffset={18} align="start">
          <Button
            size={"sm"}
            variant={"primary"}
            className="rounded-sm hidden md:block h-auto py-1.5 px-2"
          >
            Create
          </Button>
        </FormPopOver>
        <FormPopOver>
          <Button
            variant={"primary"}
            size={"sm"}
            className="rounded-sm block md:hidden"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopOver>
      </div>
      <div className="ml-auto flex mx-4 items-center gap-x-8 ">
        <OrganizationSwitcher />
        <UserButton />
      </div>
    </nav>
  );
};
