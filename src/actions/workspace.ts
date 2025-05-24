"use server";

import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";

export const verifyAccessToWorkspace = async (workspaceId: string) => {
    try{
        const user = await currentUser()
        if(!user) 
            return {status: 403, message: "User not found"}

        const isUserInWorkspace = await client.workSpace.findUnique({
            where: {
                id: workspaceId,
                OR: [
                    {
                        user: {
                            clerkId: user.id
                        }
                    },
                    {
                        members: {
                            every: {
                                user: {
                                    clerkId: user.id
                                }
                            }
                        }
                    }
                ]
            }
        })

        return {status: 200, message: "Query successful", data: isUserInWorkspace}
    }catch(err) {
        return {status: 403, message: err || "Something went wrong", data: null}  
    }
}

export const getWorkspaceFolders = async (workspaceId: string) => {
    try{
        const folders = await client.folder.findMany({
            where: {
                workSpaceId: workspaceId
            },
            include: {
                _count: {
                    select: {
                        videos: true,
                    }
                }
            }
        })

        if(folders && folders.length > 0) 
            return {status: 200, message: "Folders found", data: folders}
        else 
            return {status: 404, message: "Folders not found", data: []}
    }catch(err) {
        return {status: 403, message: err || "Something went wrong", data: []}
    }
}

export const getAllUserVideos = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404, message: "User not found" };
    }

    const videos = await client.video.findMany({
      where: {
        OR: [
          { workSpaceId: workspaceId },
          { folderId: workspaceId
          }
        ]
      },
      select: {
        id: true,
        title: true,
        processing: true,
        source: true,
        folder: {
          select: {
            id: true,
            name: true
          }
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            image: true
          }
        }
      },
      orderBy: {
        createdAt: "asc"
      }
    });

    if (videos.length > 0) {
      return { status: 200, message: "Videos found", data: videos };
    } else {
      return { status: 404, message: "Videos not found", data: [] };
    }
  } catch (err) {
    return {
      status: 403,
      message: (err as Error).message || "Something went wrong",
      data: []
    };
  }
};

export const getWorkspaces = async () => {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return { status: 403, message: "User not found", data: [] };
    }

    // 1) Find the User by their clerkId:
    const result = await client.user.findUnique({
      where: { clerkId: clerkUser.id },
      select: {
        // Only select the subscription's plan
        subscription: {
          select: {
            plan: true
          }
        },
        // Select the direct WorkSpace[] array on User
        workspace: {
          select: {
            id: true,
            name: true,
            type: true
          }
        },
        // Select any WorkSpaces this user appears in as a Member
        members: {
          select: {
            workSpace: {
              select: {
                id: true,
                name: true,
                type: true
              }
            }
          }
        }
      }
    });

    if (result) {
      return {
        status: 200,
        message: "Workspaces found",
        data: result
      };
    } else {
      return {
        status: 404,
        message: "Workspaces not found",
        data: []
      };
    }
  } catch (err) {
    return {
      status: 403,
      message: (err as Error).message || "Something went wrong",
      data: []
    };
  }
};
