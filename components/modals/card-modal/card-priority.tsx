import { Button } from "@/components/ui/button";
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { PaintBucket } from "lucide-react";

export const CardPriority = () => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <PaintBucket className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Card Priority</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"}>Set Priority</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <DropdownMenuCheckboxItem>Low</DropdownMenuCheckboxItem>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DropdownMenuCheckboxItem>Medium</DropdownMenuCheckboxItem>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DropdownMenuCheckboxItem>High</DropdownMenuCheckboxItem>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
