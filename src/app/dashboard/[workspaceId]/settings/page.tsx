"use client"

import { enableFirstView, getFirstView } from '@/actions/user'
import { DarkMode } from '@/components/theme/modes/dark-mode'
import { LightMode } from '@/components/theme/modes/light-mode'
import { SystemMode } from '@/components/theme/modes/system-mode'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const SettingsPage = () => {
    const [firstView, setFirstView] = useState<undefined | boolean>(undefined)

    //TODO: Implement the functionality to change the theme
    const {setTheme, theme} = useTheme()

    useEffect(() => {
        if(firstView !== undefined) return

        const fetchData = async () => {
            const reponse = await getFirstView()
            if(reponse.status === 200) 
                setFirstView(reponse?.data)
        }

        fetchData()
    }, [firstView])

    const switchState = async (checked: boolean) => {
        const view = await enableFirstView(checked)
        if(view) {
            if(view.status === 200) 
                toast.success(view.message || "First view enabled successfully")
            else 
                toast.error(view.message || "Something went wrong")
        }
    }

  return (
    <div>
        {/* TODO: Make this UI looks better */}
        <div className='grid grid-cols-1 lg:grid-cols-5 gap-10'>
            <div className='lg:col-span-4 flex flex-col lg:flex-row items-start gap-5'>
                <div
                    className={cn(`rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent`, theme === 'system' && 'border-purple-800')}
                    onClick={() => setTheme('system')}
                >
                    <SystemMode />
                </div>
                <div
                    className={cn(`rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent`, theme === 'light' && 'border-purple-800')}
                    onClick={() => setTheme('light')}
                >
                    <LightMode />
                </div>
                <div
                    className={cn(`rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent`, theme === 'dark' && 'border-purple-800')}
                    onClick={() => setTheme('dark')}
                >
                    <DarkMode />
                </div>
            </div>
        </div>
        <h2 className='text-2xl font-bold mt-4 capitalize'>Video sharing settings</h2>
        <p className='text-muted-foreground lg:w-3/4'>
            Enabling this feature will send you notifications when someone wathed your video for the first time. This feature can help during client outreach.
        </p>
        <Label className='flex items-center gap-x-3 mt-4 font-medium capitalize'>
            Enable first view
            <Switch 
                onCheckedChange={switchState}
                disabled={firstView === undefined}
                checked={firstView}
                onClick={() => setFirstView(!firstView)}
            />
        </Label>
    </div>
  )
}

export default SettingsPage