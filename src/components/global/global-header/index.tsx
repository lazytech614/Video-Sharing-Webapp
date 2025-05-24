"use client"

import { WorkSpace } from '@prisma/client'
import { usePathname } from 'next/navigation'
import React from 'react'

type Props = {
    workspace: WorkSpace
}

const GlobalHeader = ({workspace}: Props) => {
    const pathname = usePathname().split(`/dashboard/${workspace.id}`)[0]

  return (
    <article className='flex flex-col gap-2'>
        <span className='text-[#707070] text-xs'>{workspace.type.toLocaleUpperCase()}</span>
        <h1 className='text-4xl font-bold'>
            {pathname && !pathname.includes("folder") ? pathname.charAt(0).toUpperCase() + pathname.slice(1).toLocaleLowerCase() : "My Library"}
        </h1>
    </article>
  )
}

export default GlobalHeader