import {z} from 'zod';

export const moveVideoSchema = z.object({
    folderId: z.string().optional(),
    workspaceId: z.string().min(1, 'Workspace is required')
});