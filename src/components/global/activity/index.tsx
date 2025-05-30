"use client"

import { TabsContent } from '@/components/ui/tabs'
import React from 'react'
import CommentForm from '../forms/comment'
import CommentCard from '../comment-card'
import { useQueryData } from '@/hooks/useQueryData'
import { getVideoComments } from '@/actions/user'
import { VideoCommentProps } from '@/types/index.type'

type Props = {
  author: string
  videoId: string
}

const Activity = ({author, videoId}: Props) => {
  const {data} = useQueryData(
    ['video-comments'],
    () => getVideoComments(videoId)
  )

  const {data: comments} = data as VideoCommentProps

  return (
    <TabsContent
        value='activity'
        className='p-5 bg-[#1d1d1d] rounded-xl flex flex-col gap-y-6'
    >
        <CommentForm 
            author={author}
            videoId={videoId}
        />
        {comments && comments.map((comment) => (
            <CommentCard 
                key={comment.id} 
                comment={comment.comment} 
                author={{
                    image: comment.User?.image!,
                    firstName: comment.User?.firstName!,
                    lastName: comment.User?.lastName!
                }} 
                videoId={videoId} 
                commentId={comment.id} 
                reply={comment.reply} 
            /> 
        ))}
    </TabsContent>
  )
}

export default Activity