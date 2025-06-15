"use server";

import { currentUser } from "@clerk/nextjs/server";
import { client } from "@/lib/prisma";
import { sendEmail } from "./user";
import {createClient, OAuthStrategy } from "@wix/sdk"
import {items} from "@wix/data"

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
                workspaceId
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
        description: true,
        processing: true,
        source: true,
        createdAt: true,
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

export const moveVideoLocation = async (videoId: string, folderId: string, workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404, message: "User not found" };
    }

    const video = await client.video.update({
      where: {
        id: videoId
      },
      data: {
        folderId: folderId || null, // If folderId is null, it will remove the video from the folder
        workSpaceId: workspaceId
      }
    });

    if (video) {
      return { status: 200, message: "Video moved successfully", data: video };
    } else {
      return { status: 404, message: "Video not found", data: null };
    }
  } catch (err) {
    console.log("Error in the moveVideoLocation action", err);
    return { status: 500, message: (err as Error).message || "Something went wrong", data: null };
  }
}

export const getPreviewVideo = async (videoId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404, message: "User not found" };
    }

    const video = await client.video.findUnique({
      where: {
        id: videoId
      },
      select: {
        title: true,
        createdAt: true,
        source: true,
        description: true,
        processing: true,
        views: true,
        summary: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            image: true,
            clerkId: true,
            trial: true,
            subscription: {
              select: {
                plan: true
              }
            }
          }
        } 
      }
    });

    if (video) {
      return { 
        status: 200, 
        message: "Video found", 
        data: video, 
        author: user.id === video?.user?.clerkId ? true : false 
      };
    } else {
      return { 
        status: 404, 
        message: "Video not found", 
        data: null 
      };
    }
  } catch (err) {
    console.log("Error in the getPreviewVideo action", err);
    return { 
      status: 500, 
      message: (err as Error).message || "Something went wrong", 
      data: null 
    };
  }
}

export const sendEmailForFirstView = async (videoId: string) => {
  try {
    console.log("I have entered here...");
    const user = await currentUser();
    if (!user) {
      return { status: 404, message: "User not found" };
    }

    console.log("User found...");

    const firstViewSettings = await client.user.findUnique({
      where: {
        clerkId: user.id
      },
      select: {
        firstView: true
      }
    })

    if(!firstViewSettings?.firstView) 
      return {status: 404, message: "First view settings not found", data: null}

    console.log("First view settings found...");

    const video = await client.video.findUnique({
      where: {
        id: videoId
      },
      select: {
        title: true,
        views: true,
        user: {
          select: {
            email: true
          }
        } 
      }
    });

    if(!video) 
      return null

    console.log("Video found...");
    
    if(video.views === 0) {
      console.log("Views of video is 0 ...");
      await client.video.update({
        where: {
          id: videoId,
        },
        data: {
          views: video.views + 1
        }
      })
    }
    


    const {transporter, mailOptions} = await sendEmail(
      video.user?.email!,
      'You got a viewer',
      `Your video ${video.title} just got it's first viewer`
    )

    console.log("Transporter created...");

    transporter.sendMail(mailOptions, async (error, info) => {
      console.log("Trying to send mail...");
      if(error) 
        console.log("Error in sending mail", error.message);
      else {
        console.log("Email sent successfully", info);
        const notification = await client.user.update({
          where: {
            clerkId: user.id
          },
          data: {
            notifications: {
              create: {
                content: mailOptions.text
              }
            }
          }
        })
        if(notification) {
          console.log("Notifucation created...");
          return {status: 200, message: "Email sent successfully", data: notification}
        }
        console.log("I am leaving...");
      }
    })
  } catch (err) {
    console.log("Error in the sendEmailForFirstView action", err);
    return { status: 500, message: (err as Error).message || "Something went wrong", data: null };
  }
}

export const editVideoInfo = async (videoId: string, title: string, description: string) => {
  try {
    console.log("Video id: ", videoId);
    console.log("Title: ", title, "Description: ", description);
    const video = await client.video.update({
      where: {
        id: videoId
      },
      data: {
        title: title,
        description: description,
      }
    })
    if(video) {
      console.log("Video info updated successfully");
      return {status: 200, message: "Video info updated successfully", data: video}
    }
    else {
      console.log("Failed to update video info");
      return {status: 404, message: "Video not found", data: null}
    }
      
  } catch (err) {
    console.log("Error in the editVideoInfo action", err);
    return { status: 500, message: (err as Error).message || "Something went wrong", data: null };
  }
}

// export const getWixContent = async () => {
//   try {
//     const myWixClient = createClient({
//       modules: {items},
//       auth: OAuthStrategy({
//         clientId: process.env.WIX_CLIENT_ID! as string,
//       })
//     })

//     const videos = await (myWixClient.items as any).queryDataItems({
//       dataCollectionId: "nuevue"
//     }).find()

//     const videoIds = videos.items.map((video: any) => video.data?.id)

//     const video = await client.video.findMany({
//       where: {
//         id: {
//           in: videoIds
//         }
//       },
//       select: {
//         id: true,
//         createdAt: true,
//         title: true,
//         description: true,
//         source: true,
//         processing: true,
//         workSpaceId: true,
//         user: {
//           select: {
//             firstName: true,
//             lastName: true,
//             email: true,
//             image: true,
//             clerkId: true,
//             trial: true,
//             subscription: {
//               select: {
//                 plan: true
//               }
//             }
//           }
//         },
//         folder: {
//           select: {
//             name: true,
//             id: true
//           }
//         }
//       }
//     })

//     if(video && video.length > 0) {
//       console.log("Videos", video);
//       return {status: 200, message: "Videos found successfully", data: video}
//     }else {
//       return {status: 404, message: "Videos not found", data: null}
//     }
//   }catch(err) {
//     console.log("Error in the getWixContent action", err);
//     return { status: 500, message: (err as Error).message || "Something went wrong", data: null };
//   }
// }

export const getWixContent = async () => {
  try {
    const myWixClient = createClient({
      modules: { items },
      auth: OAuthStrategy({
        clientId: process.env.WIX_CLIENT_ID! as string,
      })
    });

    console.log('Wix client created:', myWixClient);
    console.log('Items module methods:', Object.getOwnPropertyNames(myWixClient.items));

    // Try different method names based on Wix SDK version
    let videos;
    
    if (typeof myWixClient.items.query === 'function') {
      // Newer SDK version
      videos = await myWixClient.items.query("nuevue").find();
    } else if (typeof (myWixClient.items as any).queryDataItems === 'function') {
      // Your original approach
      videos = await (myWixClient.items as any).queryDataItems({
        dataCollectionId: "nuevue"
      }).find();
    } else if (typeof (myWixClient.items as any).queryItems === 'function') {
      // Alternative method name
      videos = await (myWixClient.items as any).queryItems("nuevue").find();
    } else {
      throw new Error('No suitable query method found on items module');
    }

    console.log('Wix videos response:', videos);

    if (!videos || !videos.items || videos.items.length === 0) {
      return { status: 404, message: "No videos found in Wix", data: null };
    }

    const videoIds = videos.items
      .map((video: any) => video.title)
      .filter((id: any) => id); // Filter out undefined/null ids

    if (videoIds.length === 0) {
      return { status: 404, message: "No valid video IDs found", data: null };
    }

    console.log('Video IDs from Wix:', videoIds);

    const video = await client.video.findMany({
      where: {
        id: {
          in: videoIds
        }
      },
      select: {
        id: true,
        createdAt: true,
        title: true,
        description: true,
        source: true,
        processing: true,
        workSpaceId: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            image: true,
            clerkId: true,
            trial: true,
            subscription: {
              select: {
                plan: true
              }
            }
          }
        },
        folder: {
          select: {
            name: true,
            id: true
          }
        }
      }
    });

    if (video && video.length > 0) {
      console.log("Videos found:", video);
      return { status: 200, message: "Videos found successfully", data: video };
    } else {
      return { status: 404, message: "Videos not found in database", data: null };
    }

  } catch (err) {
    console.error("Error in the getWixContent action", err);
    
    // More detailed error logging
    if (err instanceof Error) {
      console.error("Error name:", err.name);
      console.error("Error message:", err.message);
      console.error("Error stack:", err.stack);
    }
    
    return { 
      status: 500, 
      message: (err as Error).message || "Something went wrong", 
      data: null 
    };
  }
}
