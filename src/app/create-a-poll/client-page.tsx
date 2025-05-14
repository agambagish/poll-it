"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { ArrowBigLeftDashIcon, ChartColumnBigIcon, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import type { PollSchema } from "@/lib/poll-schema";
import type { PollCreationStep } from "@/lib/types";

import { Intro } from "@/components/poll-creation/intro";
import { Options } from "@/components/poll-creation/options";
import { Question } from "@/components/poll-creation/question";
import { Button } from "@/components/ui/button";
import { usePollCreationParams } from "@/hooks/use-poll-creation-params";
import { client } from "@/lib/hono";
import { pollSchema } from "@/lib/poll-schema";

const steps: PollCreationStep[] = [
  {
    step: "question",
    fields: ["question"],
  },
  {
    step: "options",
    fields: ["options"],
  },
];

export function ClientPage() {
  const router = useRouter();
  const { step, setParams } = usePollCreationParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<PollSchema>({
    mode: "onChange",
    resolver: zodResolver(pollSchema),
    defaultValues: {
      question: "",
      options: [],
    },
  });

  const optionsFieldArray = useFieldArray({
    control: form.control,
    // @ts-expect-error IDK
    name: "options",
  });

  async function onSubmit(values: PollSchema) {
    setIsLoading(true);

    const apiRes = await client.api.polls.$post({
      json: { ...values },
    });

    if (!apiRes.ok) {
      setIsLoading(false);
      return;
    }

    const { pollId } = await apiRes.json();

    toast.success("Poll created successfully!");
    setIsLoading(false);
    router.push(`/p/${pollId}`);
  }

  async function onNext() {
    const fields = steps.find(({ step }) => step)?.fields;
    const output = await form.trigger(fields, { shouldFocus: true });

    if (!output)
      return;

    if (step === "options") {
      await form.handleSubmit(onSubmit)();
    }
    else {
      setParams({ step: "options" });
    }
  }

  function onPrevious() {
    setParams({ step: "question" });
  }

  return (
    <main className="flex justify-center items-center h-[calc(100vh-5rem)]">
      <AnimatePresence mode="wait">
        {step === "intro" && (
          <Intro />
        )}
        {step === "question" && (
          <Question form={form} onSubmit={onSubmit}>
            <Button
              type="button"
              className="w-full"
              size="sm"
              onClick={onNext}
            >
              Go to next step
            </Button>
          </Question>
        )}
        {step === "options" && (
          <Options
            form={form}
            onSubmit={onSubmit}
            optionsFieldArray={optionsFieldArray}
            disabled={isLoading}
          >
            <div className="flex justify-between">
              <Button
                type="button"
                size="sm"
                onClick={onPrevious}
                variant="ghost"
                disabled={isLoading}
              >
                <ArrowBigLeftDashIcon />
                Back
              </Button>
              <Button
                type="button"
                onClick={() => optionsFieldArray.append("")}
                size="icon"
                variant="secondary"
                className="size-8"
                disabled={isLoading}
              >
                <PlusCircleIcon />
              </Button>
            </div>
            <Button
              type="button"
              size="sm"
              className="w-full"
              onClick={onNext}
              disabled={!form.formState.isValid || isLoading}
            >
              <ChartColumnBigIcon />
              Create poll
            </Button>
          </Options>
        )}
      </AnimatePresence>
    </main>
  );
}
