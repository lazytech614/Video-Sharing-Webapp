import { useCreateWorkspace } from '@/hooks/useCreateWorkspace'
import React from 'react'
import FormGenerator from '../../form-generator'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'

const WorkspaceForm = () => {
  const {errors, onFormSubmit, register, isPending} = useCreateWorkspace()

  return (
    <form
      onSubmit={onFormSubmit}
      className='flex flex-col gap-y-3'
    >
      <FormGenerator
        inputType='input'
        type='text'
        label='Workspace Name'
        placeholder='Enter workspace name'
        name='name'
        register={register}
        errors={errors}
        required
      />
      <Button
        type='submit'
        className='text-sm w-full mt-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white'
        disabled={isPending}
      >
        <Loader state={isPending}>
          Create Workspace
        </Loader>
      </Button>
    </form>
  )
}

export default WorkspaceForm