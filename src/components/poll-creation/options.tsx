"use client";

import type { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";

import { motion } from "framer-motion";

import type { PollSchema } from "@/lib/poll-schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props {
  form: UseFormReturn<PollSchema>;
  optionsFieldArray: UseFieldArrayReturn<PollSchema>;
  onSubmit: (values: PollSchema) => void;
  children: React.ReactNode;
  disabled: boolean;
}

export function Options({
  form,
  onSubmit,
  children,
  optionsFieldArray,
  disabled,
}: Props) {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, type: "spring" }}
    >
      <motion.div
        variants={{
          show: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        animate="show"
        className="flex flex-col space-y-4 rounded-xl bg-background/60 p-8"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 250 },
            show: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.4, type: "spring" },
            },
          }}
          className="space-y-1.5"
        >
          <h1 className="text-pretty text-2xl font-bold transition-colors sm:text-3xl">
            What are the choices?
          </h1>
          <p className="text-pretty text-sm text-muted-foreground transition-colors sm:text-base">
            Add all the options you'd like to hear thoughts on.
          </p>
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 100 },
            show: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.4, type: "spring" },
            },
          }}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2"
              autoComplete="off"
            >
              {optionsFieldArray.fields.map((field, i) => (
                <FormField
                  key={field.id}
                  control={form.control}
                  name={`options.${i}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative" key={i}>
                          <Input
                            className="peer ps-7"
                            placeholder={`Option ${i + 1}`}
                            disabled={disabled}
                            {...field}
                          />
                          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            {i + 1}
                            .
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              {children}
            </form>
          </Form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
