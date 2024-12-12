/*
    Description -> Creating validation function to make sure correct schema for the object.
*/

import { z } from 'zod';

export const createNoteSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().optional(),
    coverImageUrl: z.string(),
});

export type CreateNoteSchema = z.infer<typeof createNoteSchema>;