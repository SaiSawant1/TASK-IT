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
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import { useState } from "react";
import { useCreateOrg } from "@/hooks/use-action-create-org";
import { createOrgAction } from "@/actions/create-organization";
import { useRouter } from "next/navigation";

interface CreateOrgFormProps {
  isModalOpen: boolean;
  setModalClose: () => void;
}
export const CreateOrgForm = ({
  isModalOpen,
  setModalClose,
}: CreateOrgFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof CreateOrgSchema>>({
    resolver: zodResolver(CreateOrgSchema),
    defaultValues: {
      name: "",
    },
  });
  const { error, execute, isLoading } = useCreateOrg(createOrgAction, {
    onSuccess: (data) => {
      setSuccess("organization created");
      router.push(`/organization/${data.id}`);
      setModalClose();
    },
  });
  const [success, setSuccess] = useState<string | undefined>("");
  const onSubmit = (value: z.infer<typeof CreateOrgSchema>) => {
    const { name } = value;
    execute({ title: name });
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
                        disabled={isLoading}
                        className="bg-zinc-300/50 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter Organization Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isLoading} type="submit" className="w-full">
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
