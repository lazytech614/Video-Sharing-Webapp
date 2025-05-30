"use client"

import React from 'react'

import { getNotifications } from '@/actions/user'
import { useQueryData } from '@/hooks/useQueryData'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { User2 } from 'lucide-react'

type Props = {}

const NotificationsPage = (props: Props) => {
    const {data: notifications} = useQueryData(
        ['user-notifications'],
        getNotifications
    )

    const {data: notification, status} = notifications as {
        status: number,
        data: {
            notifications: {
                id: string,
                userId: string | null,
                content: string,
            }[]
        }
    }

    if(status !== 200) 
        return (
            <div className='flex justify-center items-center h-full w-full capitalize'>No notifications</div>
        )

  return (
    // TODO: Add datewise notifications
    <div className='flex flex-col'>
        {notification.notifications.map((n) => (
            <div key={n.id} className='border-2 flex gap-x-2 items-center rounded-lg p-3'>
                <Avatar>
                    <AvatarFallback>
                        <User2 />
                    </AvatarFallback>
                </Avatar>
                <p>{n.content}</p>
            </div>
        ))}
    </div>
  )
}

export default NotificationsPage