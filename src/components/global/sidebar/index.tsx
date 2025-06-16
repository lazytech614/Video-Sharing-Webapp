"use client";

import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"

import logo from "../../../../public/Nuvue-logo.svg"
import { 
    Select, 
    SelectContent, 
    SelectValue, 
    SelectTrigger, 
    SelectGroup, 
    SelectLabel, 
    SelectItem 
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useQueryData } from "@/hooks/useQueryData"
import { getWorkspaces } from "@/actions/workspace"
import { NotificationProps, WorkspaceProps } from "@/types/index.type"
import Modal from "../modal";
import { Menu, PlusCircle } from "lucide-react";
import Search from "../search";
import { MENU_ITEMS } from "@/constants";
import SidebarItem from "./sidebar-item";
import { getNotifications } from "@/actions/user";
import WorkspacePlaceholder from "./workspace-placeholder";
import CustomCard from "../custom-card";
import { Button } from "@/components/ui/button";
import { 
    Sheet, 
    SheetContent, 
    SheetTrigger 
} from "@/components/ui/sheet";
import InfoBar from "../info-bar";
import { useDispatch } from "react-redux";
import { WORKSPACES } from "@/redux/slices/workspaces";
import PaymentButton from "../payment-button";

type Props = {
    activeWorkspaceId: string
}

const Sidebar = ({activeWorkspaceId}: Props) => {

    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();

    const menuItems = MENU_ITEMS(activeWorkspaceId)

    const {data, isFetched} = useQueryData(["user-workspaces"], getWorkspaces)
    const {data: notifications} = useQueryData(["user-notifications"], () => getNotifications())

    const {data: workspace} = data as WorkspaceProps
    const {data: notificationCount} = notifications as NotificationProps

    const onChangeActiveWorkspace = (value: string) => {
        router.push(`/dashboard/${value}`)
    }

    const currentWorkspace = workspace?.workspace?.find((workspace) => workspace.id === activeWorkspaceId)

    if(isFetched && workspace) {
        dispatch(WORKSPACES({workspaces: workspace?.workspace}))
    }

  const SidebarSection = (
    <div className="bg-gradient-to-b from-[#252033] to-[#1a1825] flex-none relative p-4 h-full w-[250px] flex flex-col items-center gap-y-4  overflow-hidden">
        <div className="bg-[#252033] p-4 flex justify-center items-center gap-x-2 mb-4 absolute top-0 left-0 right-0">
            <Image src={logo} alt="logo" width={40} height={40} />
            <p className="text-2xl font-bold">Nuevue</p>
         </div>
         <Select 
            defaultValue={activeWorkspaceId} 
            onValueChange={onChangeActiveWorkspace}
        >
             <SelectTrigger className="mt-16 text-neutral-400 bg-transparent border-[0.5px] border-white">
                <SelectValue placeholder="Select a workspace"></SelectValue>
             </SelectTrigger>
             <SelectContent className="bg-[#111111] backdrop-blur-xl">
                <SelectGroup>
                    <SelectLabel>Workspaces</SelectLabel>
                    <Separator />
                    {workspace?.workspace?.map((workspace) => (
                        <SelectItem 
                            key={workspace.id} 
                            value={workspace.id}
                        >
                            {workspace.name}
                        </SelectItem>
                    ))}
                    {workspace.members.length > 0 && workspace.members.map((workspace) => (
                        workspace.workSpace && 
                        
                        <SelectItem
                            key={workspace.workSpace.id}
                            value={workspace.workSpace.id}
                        >
                            {workspace.workSpace.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
             </SelectContent>
         </Select>
         {currentWorkspace?.type === 'PUBLIC' && workspace.subscription?.plan === 'PRO' && (
            <Modal 
                trigger={
                    <span className="text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60 w-full p-[10px] gap-2 rounded-md">
                        <PlusCircle className="w-4 h-4 text-neutral-800/90 fill-neutral-500"/> 
                        <span className="text-neutral-400 font-semibold text-xs">Invite To Workspace</span>
                    </span>
                }
                title="Invite To Workspace"
                description="Invite other users to your workspace"
            >
                <Search workspaceId={activeWorkspaceId} />
            </Modal>
         )}
         <p className="w-full text-[#bdbdbd] font-bold mt-4">Menu</p>
         <nav className="w-full">
            <ul>
                {menuItems.map((item) => (
                    <SidebarItem 
                        key={item.href}
                        icon={item.icon}
                        title={item.title}
                        href={item.href}
                        selected={pathname === item.href}
                        notifications={
                            (item.title === 'Notifications' && notificationCount?._count && notificationCount._count.notification) || 0
                        }
                    />
                ))}
            </ul>
         </nav>
         <Separator className="w-4/5 bg-[#9d9d9d39]" />
         <p className="w-full text-[#bdbdbd] font-bold mt-4">Workspaces</p>
         {
            workspace.workspace.length === 1 && workspace.members.length === 0 && (
                <div className="w-full flex items-center justify-center">
                    <p className="text-[#3c3c3c] font-medium text-sm">
                        {workspace.subscription?.plan === 'FREE' ? 'Upgrade your plan to create workspaces.' : 'You do not have any workspaces yet'}
                    </p>
                </div>
            )
        }
         <nav className="w-full">
            <ul className="max-h-[100px] overflow-auto overflow-x-hidden fade-layer space-y-2">
                {workspace.workspace.length > 0 && workspace.workspace.map((item) => (
                    item.type !== 'PERSONAL' && (
                        <SidebarItem 
                            href={`/dashboard/${item.id}`}
                            key={item.id}
                            icon={<WorkspacePlaceholder>{item.name.charAt(0).toUpperCase()}</WorkspacePlaceholder>}
                            title={item.name}
                            notifications={0}
                            selected={pathname === `/dashboard/${item.id}`}
                        />
                    )
                ))}
                {
                    workspace.members.length > 0 && workspace.members.map((item) => (
                        item.workSpace && (
                            <SidebarItem 
                                href={`/dashboard/${item.workSpace.id}`}
                                key={item.workSpace.id}
                                icon={<WorkspacePlaceholder>{item.workSpace.name.charAt(0).toUpperCase()}</WorkspacePlaceholder>}
                                title={item.workSpace.name}
                                notifications={0}
                                selected={pathname === `/dashboard/${item.workSpace.id}`}
                            />
                        )
                    ))
                }
            </ul>
         </nav>
         <Separator className="w-4/5 bg-[#9d9d9d39]" />
         {
            workspace.subscription?.plan === 'FREE' && (
                <CustomCard
                    title="Upgrade Your Plan"
                    description="Upgrade to Pro to unlock AI features like transcript and summarization and more."
                >
                    {/* <Button className="text-sm mt-2 w-full">
                        <Loader state={false}>
                            <span>Upgrade Plan</span>
                        </Loader>
                    </Button> */}
                    <PaymentButton />
                </CustomCard>
            )
         }
    </div>
  )

  return (
    <div className="full">
        {/* INFOBAR  */}
        <InfoBar />
        {/* Sheet component for mobile and desktop */}
        <div className="md:hidden fixed my-4">
            <Sheet>
                <SheetTrigger asChild className="ml-2">
                    <Button variant={"ghost"} className="mt-[2px]">
                        <Menu size={30} />
                    </Button>
                </SheetTrigger>
                <SheetContent side={"left"} className="p-0 w-fit h-full">
                    {SidebarSection}
                </SheetContent>
            </Sheet>
        </div>
        <div className="hidden md:block h-full">{SidebarSection}</div>
    </div>
  )
}

export default Sidebar