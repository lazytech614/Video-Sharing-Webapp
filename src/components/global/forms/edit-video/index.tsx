import { useEditVideo } from '@/hooks/useEditVideo'
import React from 'react'
import FormGenerator from '../../form-generator'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'

type Props = {
    videoId: string
    title: string 
    description: string
}

const EditVideoForm = ({videoId, title, description}: Props) => {
    const {errors, onFormSubmit, register, isPending} = useEditVideo(videoId, title, description)

  return (
    <form onSubmit={onFormSubmit} className='flex flex-col gap-y-5'>
        <FormGenerator 
            inputType='input'
            type='text'
            label='Title'
            placeholder='Enter video title'
            name='title'
            register={register}
            errors={errors}
            required
        />
        <FormGenerator 
            inputType='input'
            type='text'
            label='Description'
            placeholder='Enter video description'
            name='description'
            register={register}
            errors={errors}
            required
        />
        <Button 
            type='submit'
            className='text-sm w-full mt-2'
            disabled={isPending}
        >
            <Loader state={isPending}>
                Update Video
            </Loader>
        </Button>
    </form>
  )
}

export default EditVideoForm

