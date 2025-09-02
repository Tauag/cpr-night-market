import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
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

export interface FormInput {
  name: string;
  label: string;
  description?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

interface DialogFormProps {
  title: string;
  description: string;
  triggerButtonText: string;
  formInputs: FormInput[];
  schema: z.AnyZodObject;
  defaultValues: Record<string, string | number>;
  onSubmit?: (data: Record<string, string | number>) => void;
}

export default function DialogForm({
  title,
  description,
  triggerButtonText,
  formInputs,
  schema,
  defaultValues,
  onSubmit,
}: DialogFormProps) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const submitFn = (values: z.infer<typeof schema>) => {
    onSubmit?.(values);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon /> {triggerButtonText}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitFn)}>
            <div className="grid gap-4">
              {formInputs.map((input) => (
                <div key={input.name} className="grid gap-3">
                  <FormField
                    control={form.control}
                    name={input.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{input.label}</FormLabel>
                        <FormControl>
                          <Input {...input.inputProps} {...field} />
                        </FormControl>
                        {input.description && (
                          <FormDescription>{input.description}</FormDescription>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
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
