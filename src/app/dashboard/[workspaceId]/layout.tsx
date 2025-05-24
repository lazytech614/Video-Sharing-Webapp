import { redirect } from 'next/navigation'
import { 
    dehydrate, 
    HydrationBoundary, 
    QueryClient 
} from '@tanstack/react-query'

import { verifyAccessToWorkspace } from '@/actions/workspace'
import { onAuthenticateUser } from '@/actions/user'
import { 
    getWorkspaceFolders, 
    getAllUserVideos, 
    getWorkspaces 
} from '@/actions/workspace'
import { getNotifications } from '@/actions/user'
import Sidebar from '@/components/global/sidebar'

type Props = {
    params: {
        workspaceId: string
    },
    children: React.ReactNode
}

const Layout = async ({
    params: {workspaceId}, 
    children
}: Props) => {
    //Authintication...
    const auth = await onAuthenticateUser()
    if(!auth.user?.workspace || !auth.user?.workspace.length)
        return redirect('/auth/sign-in')

    const hasAccess = await verifyAccessToWorkspace(workspaceId)

    if(hasAccess.status !== 200)
        return redirect(`/dashboard/${auth.user.id}`);

    if(!hasAccess.data?.id)
        return null

    const query = new QueryClient()
    await query.prefetchQuery({
        queryKey: ['workspace-folders'],
        queryFn: async () => getWorkspaceFolders(workspaceId)
    })
    await query.prefetchQuery({
        queryKey: ['user-videos'],
        queryFn: async () => getAllUserVideos(workspaceId)
    })
    await query.prefetchQuery({
        queryKey: ['user-workspaces'],
        queryFn: async () => getWorkspaces()
    })
    await query.prefetchQuery({
        queryKey: ['user-notifications'],
        queryFn: async () => getNotifications()
    })

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className='flex h-screen w-screen'>
                <Sidebar activeWorkspaceId = {workspaceId} />
                <div className='w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden'></div>
            </div>
        </HydrationBoundary>
    )
}

export default Layout