export type WorkspaceProps = {
    data: {
        subscription: {
            plan: 'FREE' | 'PRO'
        } | null,
        workspace: {
            id: string,
            name: string,
            type: 'PUBLIC' | 'PERSONAL'
        }[],
        members: {
            workspace: {
                id: string,
                name: string,
                type: 'PUBLIC' | 'PERSONAL'
            }
        }[]
    }
}

export type NotificationProps = {
    status: number,
    data: {
        _count: {
            notification: number
        }
    }
}