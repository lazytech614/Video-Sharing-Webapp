import {z} from 'zod';

export const workspaceFormSchema = z.object({
  name: z.string().min(1, 'Workspace name is required'),
  description: z.string().optional(),
  logo: z.string().optional(),
  color: z.string().optional(),
  domain: z.string().url('Invalid URL format').optional(),
  isPublic: z.boolean().default(false),
});