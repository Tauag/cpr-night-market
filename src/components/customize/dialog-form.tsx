import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
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
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export interface FormInput {
  name: string;
  label: string;
  className?: string;
  description?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  select?: boolean;
  selectProps?: React.ComponentProps<typeof Select>;
  selectOptions?: { value: string; label: string }[];
  selectPlaceholder?: string;
  textarea?: boolean;
  textAreaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

interface DialogFormProps {
  title: string;
  description: string;
  triggerButtonText?: string;
  formInputs: FormInput[];
  schema: z.AnyZodObject;
  defaultValues: Record<string, string | number>;
  onSubmit?: (data: Record<string, string | number>) => void;
  defaultOpen?: boolean;
  showButton?: boolean;
}

export default function DialogForm({
  title,
  description,
  triggerButtonText,
  formInputs,
  schema,
  defaultValues,
  onSubmit,
  defaultOpen,
  showButton = true,
}: DialogFormProps) {
  const [open, setOpen] = useState(!!defaultOpen);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const submitFn = (values: z.infer<typeof schema>) => {
    onSubmit?.(values);
    setOpen(false);
    form.reset();
  };

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form.reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {showButton && (
        <DialogTrigger asChild>
          <Button variant="outline">
            <PlusIcon /> {triggerButtonText}
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitFn)}>
            <div className="grid gap-4 grid-cols-2">
              {formInputs.map((input) => (
                <div
                  key={input.name}
                  className={cn("col-span-2", input.className)}
                >
                  <FormField
                    control={form.control}
                    name={input.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{input.label}</FormLabel>
                        <Select
                          name={input.name}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          {...input.selectProps}
                        >
                          <FormControl>
                            <div>
                              {input.select && (
                                <SelectTrigger className="w-full">
                                  <SelectValue
                                    placeholder={
                                      input.selectPlaceholder ||
                                      "Select an option"
                                    }
                                  />
                                </SelectTrigger>
                              )}
                              {input.textarea && (
                                <Textarea
                                  className="resize-none"
                                  {...input.textAreaProps}
                                  {...field}
                                />
                              )}
                              {!input.select && !input.textarea && (
                                <Input {...input.inputProps} {...field} />
                              )}
                            </div>
                          </FormControl>
                          {input.selectOptions && (
                            <SelectContent>
                              {input.selectOptions.map((option) => (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          )}
                        </Select>
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
