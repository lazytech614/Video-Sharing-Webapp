import { useCreateWorkspace } from '@/hooks/useCreateWorkspace'
import React from 'react'
import FormGenerator from '../../form-generator'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'

type Props = {}

const WorkspaceForm = (props: Props) => {
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
        className='text-sm w-full mt-2'
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