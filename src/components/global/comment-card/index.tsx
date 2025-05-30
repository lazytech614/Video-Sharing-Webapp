"use client"

import React, { useState } from 'react'

import { CommentRepliesProps } from '@/types/index.type'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'
import CommentForm from '../forms/comment'

type Props = {
    comment: string
    author: {
        image: string
        firstName: string
        lastName: string
    }
    videoId: string
    commentId?: string
    reply: CommentRepliesProps[]
    isReply?: boolean
}

const CommentCard = ({
    comment, 
    author, 
    videoId, 
    commentId, 
    reply, 
    isReply
}: Props) => {
    const [onReply, setOnReply] = useState(false)

  return (
    <Card
        className={cn(isReply
            ? 'bg-[#1d1d1d] pl-10 border-none'
            : 'border-[1px] bg-[#1d1d1d] p-5'
        )}
    >
        <div className='flex gap-x-2 items-center'>
            <Avatar className='h-6 w-6'>
                <AvatarImage 
                    src={author.image}
                    alt={author.firstName || "Author Image"}
                />
            </Avatar>
            <p className='capitalize text-sm text-[#bdbdbd]'>{author.firstName} {author.lastName}</p>
        </div>
        <div className='mt-2'>
            <p className='text-[#bdbdbd]'>{comment}</p>
        </div>
        {!isReply && (
            <div className='flex justify-end mt-3'>
                {!onReply ? (
                    <Button
                        onClick={() => setOnReply(true)}
                        className='text-sm rounded-full bg-[#252525] text-white hover:text-black'
                    >
                        Reply
                    </Button>
                ) : (
                    <CommentForm
                        videoId={videoId}
                        commentId={commentId}
                        author={author.firstName + ' ' + author.lastName}
                        close={() => setOnReply(false)}
                    />
                )}
            </div>
        )}
        {reply.length > 0 && (
            <div className='flex flex-col gap-y-10 mt-5'>
                {reply.map((reply) => (
                    <CommentCard
                        key={reply.id}
                        isReply
                        reply={[]}
                        comment={reply.comment}
                        videoId={videoId}
                        commentId={reply.id}
                        author={{
                            image: reply.User?.image!,
                            firstName: reply.User?.firstName!,
                            lastName: reply.User?.lastName!
                        }}
                    />
                ))}
            </div>
        )}
    </Card>
  )
}

export default CommentCard