"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AlertTriangle, Upload, User, X } from "lucide-react";
import { BaseSyntheticEvent, useRef, useState } from "react";
import { DropZone } from "./drop-zone";
import { Button } from "@/components/ui/button";
import { GetSignedUrl } from "@/actions/s3-image-upload/get-presigned-url";
import { useAction } from "@/hooks/use-action";
import { UpdateProfileImage } from "@/actions/update-profile-image";
import { toast } from "sonner";
import useCurrentOrg from "@/store";

interface ProfileImageProps {
  image?: string | null | undefined;
  userId?: string | null | undefined;
}

export const ProfileImage = ({ image, userId }: ProfileImageProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const orgId = useCurrentOrg((state) => state.organizationId);
  const { execute } = useAction(UpdateProfileImage, {
    onSuccess: (data) => {
      toast.success(`profile image of ${data.name} updated`);
    },
    onError: (error) => {
      toast.success(`failed to update profile image: ${error}
      `);
    },
  });
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [previewURL, setPreviewURL] = useState<string | undefined>(undefined);
  const allowedFiles = ["image/png", "image/jpg", "image/jpeg"];

  const handleChange = (e: BaseSyntheticEvent) => {
    const file: File = e.target.files[0];
    if (!file) return;
    if (!allowedFiles.includes(file.type)) {
      setError(`File type <${file.type}> not Supported. Only .png .jpg .jpeg`);
    } else {
      setImageFile(file);
      setPreviewURL(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleUpload = async () => {
    if (imageFile === undefined) {
      setError("Please select a image");
      return;
    }

    if (!userId) {
      setError("no user Id");
      return;
    }

    setIsUploading(true);

    try {
      const signedUrl = await GetSignedUrl();
      if (signedUrl.data) {
        const url = signedUrl.data;
        await fetch(url, {
          method: "PUT",
          body: imageFile,
          headers: {
            "Content-Type": imageFile.type,
          },
        });

        const newImageURL = url.split("?")[0];
        execute({ userId, imageUrl: newImageURL }, orgId);
      }
      if (signedUrl.error) {
        setError(signedUrl.error);
        throw new Error("something went wrong");
      }
    } catch (error) {
      setError("something went wrong");
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setImageFile(undefined);
    setPreviewURL(undefined);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };
  return (
    <div className="h-full w-full">
      <h1 className="text-xl font-semibold my-2">Profile Photo</h1>
      <div className="flex justify-evenly shadow-black shadow-sm flex-col h-48 rounded-lg">
        <div className=" flex justify-center items-center grow bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 rounded-t-lg">
          {image ? (
            <Avatar className="h-24 w-24 rounded-[100%]">
              <AvatarImage src={image} />
            </Avatar>
          ) : (
            <DropZone
              handleChange={handleChange}
              ref={inputRef}
              handleClick={handleClick}
              previewUrl={previewURL}
            />
          )}
        </div>
        <div className="grow flex space-x-2 justify-center items-center">
          {error ? (
            <div className=" flex justify-center items-center text-red-800">
              <AlertTriangle className="w-5 h-5 mx-3" />
              {error}
            </div>
          ) : (
            <>
              <Button
                disabled={isUploading}
                onClick={handleUpload}
                size={"sm"}
                variant={"primary"}
              >
                Upload
              </Button>
              <Button
                disabled={isUploading}
                onClick={handleCancel}
                size={"sm"}
                variant={"destructive"}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
