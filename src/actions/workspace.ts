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

export const createWorkspace = async (name: string) => {
  try{
    const user = await currentUser()
    if(!user) 
      return {status: 404, message: "User not found"}

    const authorized = await client.user.findUnique({
      where: {
        clerkId: user.id
      },
      select: {
        subscription: {
          select: {
            plan: true
          }
        }
      }
    })

    if(authorized?.subscription?.plan === 'PRO') {
      const workspace = await client.user.update({
        where: {
          clerkId: user.id
        },
        data: {
          workspace: {
            create: {
              name: name,
              type: 'PUBLIC',
            }
          }
        }
      })

      if(workspace) 
        return {status: 201, message: "Workspace created successfully", data: workspace}
    }
    return {status: 401, message: "You are not authorized to create a workspace", data: null}
  }catch(err) {
    console.log("Error in the createWorkspace action", err);
    return {status: 500, message: (err as Error).message || "Something went wrong", data: null};
  }
}

export const renameFolder = async (folderId: string, name: string) => {
  try{
    const folder = await client.folder.update({
      where: {
        id: folderId
      },
      data: {
        name: name
      }
    })

    if(folder) 
      return {status: 200, message: "Folder renamed successfully", data: folder}
    else 
      return {status: 404, message: "Folder not found", data: null}
  }catch(err) {
    console.log("Error in the renameFolder action", err);
    return {status: 500, message: (err as Error).message || "Something went wrong", data: null};
  }
}

export const createFolder = async (workspaceId: string) => {
  try{
    const user = await currentUser()
    if(!user) 
      return {status: 404, message: "User not found"}

    const result = await client.workSpace.update({
      where: {
        id: workspaceId
      },
      data: {
        folders: {
          create: {
            name: "Untitled Folder",
          }
        }
      },
      select: {
        // Only select the single, newly created folder (ordered by creation time)
        folders: {
          orderBy: { createdAt: "desc" },
          take: 1,
          include: { _count: { select: { videos: true } } }
        }
      }
    })

    const [isNewFolder] = result.folders;

    if(isNewFolder) {
      return {status: 201, message: "Folder created successfully", data: isNewFolder}
    } else {
      return {status: 400, message: "Could not create folder", data: null}
    }

  }catch(err) {
    console.log("Error in the createFolder action", err);
    return {status: 500, message: (err as Error).message || "Something went wrong", data: null};
  }
}

export const getFolderInfo = async (folderId: string) => {
  try {
    const folder = await client.folder.findUnique({
      where: {
        id: folderId
      },
      select: {
        name: true,
        _count: {
          select: {
            videos: true
          }
        }
      }
    });

    if (folder) {
      return { status: 200, message: "Folder info found", data: folder };
    } else {
      return { status: 404, message: "Folder not found", data: null };
    }
  } catch (err) {
    console.log("Error in the getFolderInfo action", err);
    return { status: 500, message: (err as Error).message || "Something went wrong", data: null };
  }
}