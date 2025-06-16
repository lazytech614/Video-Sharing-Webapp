import { IoHomeSharp } from "react-icons/io5";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoLibrarySharp } from "react-icons/io5";
import { IoSettingsSharp } from "react-icons/io5";
import { IoWalletSharp } from "react-icons/io5";

export const MENU_ITEMS = (workspaceId: string): {title: string, href: string, icon: React.ReactNode}[] => [
    {
        title: 'Home',
        href: `/dashboard/${workspaceId}/home`,
        icon: <IoHomeSharp />
    },
    {
        title: 'My Library',
        href: `/dashboard/${workspaceId}`,
        icon: <IoLibrarySharp />
    },
    {
        title: 'Notifications',
        href: `/dashboard/${workspaceId}/notifications`,
        icon: <IoNotificationsSharp />
    },
    {
        title: 'Billing',
        href: `/dashboard/${workspaceId}/billing`,
        icon:  <IoWalletSharp />
    },
    {
        title: 'Settings',
        href: `/dashboard/${workspaceId}/settings`,
        icon: <IoSettingsSharp />
    },
]