"use client";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { AuthCardWrapper } from "./auth-card-wrapper";
import { useCallback, useEffect, useState } from "react";
import { emailVerification } from "@/actions/email-verification";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";

export const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if (!token) return;
    emailVerification(token).then((data) => {
      setError(data.error);
      setSuccess(data.success);
    });
  }, [token]);
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <AuthCardWrapper
      headLabel="Confirming your email"
      backButtonHref="/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        {error || success ? (
          <>
            <FormSuccess message={success} />
            <FormError message={error} />
          </>
        ) : (
          <BeatLoader />
        )}
      </div>
    </AuthCardWrapper>
  );
};
