import {z} from 'zod';

export const editVideoInfoSchema = z.object({
    title: z.string().min(1, {message: "Title can't be empty"}).max(100, {message: "Title can't be longer than 100 characters"}),
    description: z.string().min(1, {message: "Description can't be empty"}).max(1000, {message: "Description can't be longer than 1000 characters"}),
})