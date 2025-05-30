import {z} from 'zod';

export const createCommentShema = z.object({
    comment: z.string().min(1, {message: "Comment can't be empty"}),
})