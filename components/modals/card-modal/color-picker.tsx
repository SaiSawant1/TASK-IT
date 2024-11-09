"use client";

import { UpdateCard } from "@/actions/update-card";
import { useAction } from "@/hooks/use-action";
import { cn } from "@/lib/utils";
import useCurrentOrg from "@/store";
import { CardWithList } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { PaintBucket } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ColorPickerProps {
  data: CardWithList;
}

export const ColorPicker = ({ data }: ColorPickerProps) => {
  const colorList = ["ff686b", "a5ffd6", "749bd2", "ffd988", "b388eb"];
  const orgId = useCurrentOrg((state) => state.organizationId);
  const [activeColor, setActiveColor] = useState(data.bg);
  const queryClient = useQueryClient();
  const params = useParams();
  const { execute } = useAction(UpdateCard, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });
      toast.success(`Card ${data.title} was updated`);
    },
    onError: (err) => {
      toast.error(`Failed to update card due to ${err}`);
    },
  });

  const onUpdateBGColor = (color: string) => {
    setActiveColor(color);
    const boardId = params?.boardId as string;
    execute({ id: data.id, boardId, bg: color }, orgId);
  };

  return (
    <div className="flex items-start gap-x-3 w-full">
      <PaintBucket className="h-5 w-5 mt-0.5 text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Card Color</p>
        <div className="w-fit border-2 rounded-md p-3 ">
          <div className="flex gap-2">
            {colorList.map((color, index) => (
              <p
                key={index}
                onClick={() => {
                  onUpdateBGColor(color);
                }}
                style={{ background: `#${color}` }}
                className={cn(
                  `h-10 w-10 border-2  rounded-full `,
                  activeColor === color ? "border-sky-900" : "border-white",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
