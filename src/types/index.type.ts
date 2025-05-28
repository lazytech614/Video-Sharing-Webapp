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

export type FoldersProps = {
    status: number,
    data: ({
        name: string,
        _count: {
            videos: number
        }
    } & {
        id: string,
        name: string,
        createdAt: Date,
        updatedAt: Date,
        workSpaceId: string | null,
    })[]
}

export type FolderProps = {
    status: number,
    data: {
        id: string,
        name: string,
        createdAt: Date,
        updatedAt: Date,
        workSpaceId: string | null,
        _count: {
            videos: number
        }
    }
}

export type VideosProps = {
    status: number,
    data: {
        User: {
            firstName: string | null,
            lastName: string | null,
            image: string | null,
        } | null,
        id: string,
        processing: boolean,
        Folder: {
            id: string,
            name: string
        } | null,
        title: string | null,
        source: string,
        createdAt: Date,
        updatedAt: Date,
    }[]
}