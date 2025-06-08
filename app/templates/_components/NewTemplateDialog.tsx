"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { z } from "zod";
import { create } from "domain";
import { createTemplate } from "@/actions";
import toast from "react-hot-toast";

const templateSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().optional(),
});

type TemplateFormType = z.infer<typeof templateSchema>;

export function NewTemplateButton() {
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const form = useForm<TemplateFormType>({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(templateSchema),
  });

  const onSubmit = async (values: TemplateFormType) => {


    startTransition(async () => {
      const res = await createTemplate(values.title, values.description);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Template created successfully!");
        setOpen(false);
        form.reset();
      }
    });

    // After successful submission, close dialog and reset form
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);

    // Reset form when dialog is closed
    if (!isOpen) {
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer rounded-md border px-2 py-1.5 bg-primary text-white hover:opacity-65 transition-all duration-200 ease-in-out">
          Create New Template 🚀
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Template</DialogTitle>
          <DialogDescription>
            Create a new email template with a title and optional description.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Description (optional)" {...field} />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Creating..." : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
