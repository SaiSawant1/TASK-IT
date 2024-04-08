"use server";
import { auth } from "@/auth";
import s3 from "@/lib/s3-image-upload";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const GetSignedUrl = async () => {
  const session = await auth();
  if (!session?.user.id) {
    return { error: "Unauthorized" };
  }
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: "profile-pictures/test-img",
  });

  try {
    const url = await getSignedUrl(s3, putObjectCommand, {
      expiresIn: 60,
    });
    return { data: url };
  } catch (error) {
    return { error: "something went wrong! Failed to upload." };
  }
};
