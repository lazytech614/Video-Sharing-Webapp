"use client"

import { useVideoComment } from '@/hooks/useVideoComment'
import { Send, X } from 'lucide-react'
import React from 'react'
import FormGenerator from '../../form-generator'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'

type Props = {
    videoId: string
    commentId?: string
    author: string
    close?: () => void
}

const CommentForm = ({videoId, commentId, author, close}: Props) => {
    const {
        register,
        reset,
        onFormSubmit,
        errors,
        isPending
    } = useVideoComment(videoId, commentId)

  return (
    <form className='relative w-full' onSubmit={onFormSubmit}>
        <FormGenerator 
            register={register}
            errors={errors}
            placeholder={`Respond to ${author}...`}
            name='comment'
            inputType='input'
            type='text'
        />
        <Button
            type='submit'
            className='p-0 bg-transparent absolute bottom-0 right-3 hover:bg-transparent'
        >
            <Loader state={isPending}>
                <Send 
                    size={18}
                    className='text-white/50 cursor-pointer hover:text-white/80'
                />
            </Loader>
        </Button>
    </form>
  )
}

export default CommentForm