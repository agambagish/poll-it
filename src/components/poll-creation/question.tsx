"use client";

import type { UseFormReturn } from "react-hook-form";

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
  onSubmit: (values: PollSchema) => void;
  children: React.ReactNode;
}

export function Question({ form, onSubmit, children }: Props) {
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
            What&apos;s on your mind?
          </h1>
          <p className="text-pretty text-sm text-muted-foreground transition-colors sm:text-base">
            Type your question and get the world talking.
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
              autoComplete="off"
              className="space-y-2"
            >
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Who was the first President of India?"
                        autoFocus
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {children}
            </form>
          </Form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
