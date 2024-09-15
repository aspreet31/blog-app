import * as z from 'zod';
export const formSchema = z.object({
    title: z.string().min(6, {
      message: "Title must be at least 6 characters.",
    }),
    content: z.string().min(10, {
        message: "Content must be upto 100 characters.",
      }),

  })