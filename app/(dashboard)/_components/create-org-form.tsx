"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { CreateOrgSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { createOrganization } from "@/actions/organization";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import { useState } from "react";

interface CreateOrgFormProps {
  isModalOpen: boolean;
  setModalClose: () => void;
}
export const CreateOrgForm = ({
  isModalOpen,
  setModalClose,
}: CreateOrgFormProps) => {
  const { data } = useSession();
  const form = useForm<z.infer<typeof CreateOrgSchema>>({
    resolver: zodResolver(CreateOrgSchema),
    defaultValues: {
      name: "",
    },
  });
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const onSubmit = (value: z.infer<typeof CreateOrgSchema>) => {
    createOrganization(value, data?.user.email!)
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch(() => {
        setError("something went wrong");
      });
  };
  return (
    <Dialog onOpenChange={setModalClose} open={isModalOpen}>
      <DialogContent className="bg-white text-black overflow-hidden p-0 ">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create Organization
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-8 py-4 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-sm font-bold text-zinc-600">
                      Organization Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-zinc-300/50 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter Organization Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Create new Organization
              </Button>
              <FormSuccess message={success} />
              <FormError message={error} />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
