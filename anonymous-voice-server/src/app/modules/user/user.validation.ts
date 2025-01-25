import { z } from "zod";

import { gender } from "../mentor/mentor.constant";

const createMenteeZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    userName: z.string({
      required_error: "user name is required",
    }),
    mentee: z.object({
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: "Gender is required",
      }),
    }),
  }),
});

export const UserValidation = {
  createMenteeZodSchema,
};
