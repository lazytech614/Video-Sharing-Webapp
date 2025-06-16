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
import GlobalHeader from '@/components/global/global-header'
import BackgroundEffect from '@/app/(website)/_components/hero/backgroud-effect'

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
            <div className='flex h-screen w-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900'>
                <Sidebar activeWorkspaceId = {workspaceId} />
                <div className='relative w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden'>
                    <BackgroundEffect />
                    <GlobalHeader workspace={hasAccess.data} />
                    <div className='mt-4'>{children}</div>
                </div>
            </div>
        </HydrationBoundary>
    )
}

export default Layout