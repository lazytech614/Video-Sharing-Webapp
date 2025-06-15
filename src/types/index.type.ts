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
            workSpace: {
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
        user: {
            firstName: string | null,
            lastName: string | null,
            image: string | null,
        } | null,
        id: string,
        processing: boolean,
        folder: {
            id: string,
            name: string
        } | null,
        title: string | null,
        description: string | null,
        source: string,
        createdAt: Date,
        updatedAt: Date,
    }[]
}

export type VideoProps = {
    status: number,
    data: {
        user: {
            firstName: string | null,
            lastName: string | null,
            image: string | null,
            clerkId: string
            trial: boolean
            subscription: {
                plan: 'FREE' | 'PRO'
            } | null
        } | null,
        title: string | null,
        description: string | null,
        source: string,
        views: number,
        id: string,
        createdAt: Date,
        summary: string,

    }
    author: boolean
}

export type CommentRepliesProps = {
    id: string,
    comment: string,
    createdAt: Date
    commentId: string
    videoId: string
    userId: string
    User: {
        id: string
        email: string
        firstName: string | null
        lastName: string | null
        createdAt: Date
        clerkId: string
        image: string
        trial: boolean
        firstView: boolean
    } | null
}

export type VideoCommentProps = {
    data: {
        User: {
            id: string
            email: string
            firstName: string | null
            lastName: string | null
            createdAt: Date
            clerkId: string
            image: string
            trial: boolean
            firstView: boolean
        } | null
        reply: CommentRepliesProps[]
        id: string,
        comment: string,
        createdAt: Date
        commentId: string
        videoId: string
        userId: string
    }[]
}