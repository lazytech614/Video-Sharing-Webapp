"use client"

import { useEffect, useState } from "react"
import { useQueryData } from "./useQueryData"
import { searchUsers } from "@/actions/user"

export const useSearch = (key: string, type: "USERS") => {
    const [query, setQuery] = useState('')
    const [debounce, setDebounce] = useState('')
    const [onUsers, setOnUsers] = useState<{
        id: string,
        subscription: {
            plan: 'FREE' | 'PRO'
        } | null,
        firstName: string | null,
        lastName: string | null,
        email: string | null,
        image: string | null
    }[] | undefined>(undefined)

    const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounce(query)
        }, 1000)
        return () => clearTimeout(timer)
    }, [query])

    const {isFetching, refetch} = useQueryData(
        [key, debounce], 
        async ({queryKey}) => {
            if(type === "USERS") {
                const users = await searchUsers(queryKey[1] as string)

                if(users.status === 200) {
                    setOnUsers(users.data)
                    return users.data
                }
                return []
            }
            return []
        },
        false
    )

    useEffect(() => {
        if(debounce) 
            refetch()
        if(!debounce) 
            setOnUsers(undefined)
    }, [debounce])

    return { onUsers, onSearchQuery, isFetching, query }
}