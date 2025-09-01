import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Book } from "@/types/night-market";
import { BookSchema } from "@/validator/night-market-validator";

interface DialogFormProps {
  children: React.ReactNode;
  onSubmit?: (data: Book) => void;
}

export default function DialogForm({ children, onSubmit }: DialogFormProps) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(BookSchema),
    defaultValues: {
      id: crypto.randomUUID(),
      name: "",
      abbreviation: "",
      download_link: "",
    },
  });

  const submitFn = (values: z.infer<typeof BookSchema>) => {
    onSubmit?.(values as Book);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{children}</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New DLC</DialogTitle>
          <DialogDescription>
            Create your DLC here, click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitFn)}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input autoComplete="off" required {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the name of your DLC.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="abbreviation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Abbreviation</FormLabel>
                      <FormControl>
                        <Input autoComplete="off" required {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the abbreviation that will be used to tag
                        content made under this DLC.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="download_link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Download Link</FormLabel>
                      <FormControl>
                        <Input autoComplete="off" {...field} />
                      </FormControl>
                      <FormDescription>
                        If the DLC is available for download, provide the link
                        here.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
