"use client";

import { getWorkspaces } from '@/actions/workspace'
import { useQueryData } from '@/hooks/useQueryData'
import React from 'react'
import Modal from '../modal';
import { Button } from '@/components/ui/button';
import { FolderPlusIcon } from 'lucide-react';
import WorkspaceForm from '../forms/workspace-form';

const CreateWorkspace = () => {
    const { data } = useQueryData(["user-workspaces"], getWorkspaces)
    const {data: plan} = data as {
        status: number,
        data: {
            subscription: {
                plan: 'FREE' | 'PRO'
            } | null
        }
    }

    if(plan?.subscription?.plan === 'FREE') 
        return null

    if(plan?.subscription?.plan === 'PRO') 
        return (
            <Modal
                title='Create Workspace'
                description='Workspaces help you organize your videos and folders and collaborate with other team members. You are assigned a default workspace where you can share videos in private with yourself.'
                trigger={
                    <Button className='z-[20] bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white flex items-center gap-2 py-6 px-4 rounded-2xl'>
                        <FolderPlusIcon />
                        <span className='text-white'>Create Workspace</span>
                    </Button>
                }
            >
                <WorkspaceForm />
            </Modal>
        )
}

export default CreateWorkspace