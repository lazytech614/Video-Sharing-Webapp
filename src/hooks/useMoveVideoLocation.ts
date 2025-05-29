"use client";

import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { useMutationData } from "./useMutationData";
import { getWorkspaceFolders, moveVideoLocation } from "@/actions/workspace";
import { useZodForm } from "./useZodForm";
import { moveVideoSchema } from "@/components/global/forms/change-video-location/schema";

export const useMoveVideoLocation = (videoId: string, currentWorkspace: string) => {
    // Get redux state
    const {folders} = useAppSelector((state) => state.FolderReducer)
    const {workspaces} = useAppSelector((state) => state.WorkspacesReducer);

    // Fetching states
    const [isFetching, setIsFetching] = useState(false);

    // Folder states
    const [isFolders, setIsFolders] = useState<
    | ({_count: {videos: number}} & {
        id: string,
        name: string,
        createdAt: Date,
        updatedAt: Date,
        workspaceId: string | null
    })[] | undefined
    >(undefined)

    // use mutation data optimistic
    const {mutate, isPending} = useMutationData(
        ['change-video-location'],
        (data: {folderId: string, workspaceId: string}) => moveVideoLocation(videoId, data.folderId, data.workspaceId)
    )

    // usezodform
    const {errors, onFormSubmit, register, watch} = useZodForm(
        moveVideoSchema, 
        mutate, 
        {workspaceId: currentWorkspace, folderId: null}
    )

    // fetch folders with a useEffect hook
    const fetchFolders = async (workspace: string) => {
        setIsFetching(true)
        const folders = await getWorkspaceFolders(workspace)
        setIsFetching(false)
        setIsFolders(folders.data)
    }

    useEffect(() => {
        fetchFolders(currentWorkspace)
    }, [])

    useEffect(() => {
        const workspace = watch(async (value) => {
            if(value.workspaceId) fetchFolders(value.workspaceId)
        })

        return () => workspace.unsubscribe()
    }, [watch])

    // Final returns
    return {
        onFormSubmit,
        errors,
        register,
        isPending,
        folders,
        isFetching,
        isFolders,
        workspaces
    }
}