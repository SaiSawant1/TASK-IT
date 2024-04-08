"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Upload, User } from "lucide-react";
import { SyntheticEvent, forwardRef } from "react";

interface DropZoneProps {
  handleClick: () => void;
  handleChange: (e: SyntheticEvent) => void;
  previewUrl: string | undefined;
}

const DropZone = forwardRef<HTMLInputElement, DropZoneProps>(
  ({ handleClick, handleChange, previewUrl }: DropZoneProps, ref) => {
    return (
      <>
        {previewUrl === undefined ? (
          <div
            onClick={handleClick}
            className=" p-2 h-24 w-24 rounded-[100%] border-black border-2 border-dotted bg-gray-200 hover:bg-gray-400 transition-all ease-in-out cursor-pointer group"
          >
            <input type="file" onChange={handleChange} ref={ref} hidden />
            <User className="w-full h-full group-hover:hidden transition-all ease-in-out group" />
            <Upload className="w-full h-full group-hover:block hidden transition-all ease-in-out group" />
          </div>
        ) : (
          <Avatar className=" h-24 w-24 rounded-[100%]">
            <AvatarImage src={previewUrl} />
          </Avatar>
        )}
      </>
    );
  },
);

DropZone.displayName = "DropZone";

export { DropZone };
