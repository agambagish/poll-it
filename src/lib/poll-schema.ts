import { z } from "zod";

export const pollSchema = z.object({
  question: z
    .string()
    .min(3, { message: "Question must be at least 4 characters long" }),
  options: z
    .array(
      z
        .string()
        .min(3, { message: "Option must be at least 3 characters long" }),
    )
    .min(2, { message: "Must be atleast 2 option" }),
});

export type PollSchema = z.infer<typeof pollSchema>;
