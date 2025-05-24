import { useMutationData } from './useMutationData';
import { createFolder } from '@/actions/workspace';

export const useCreateFolder = (workspaceId: string) => {
    const { mutate } = useMutationData(
        ['create-folder'],
        (data: { name: string }) => createFolder(workspaceId),
        'workspace-folders'
    );

    const onCreateNewFolder = () => mutate({ name: "Untitled Folder", id: "optimistic--id" });

    return { onCreateNewFolder };
}