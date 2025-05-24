import { createWorkspace } from "@/actions/workspace"
import { useZodForm } from "./useZodForm"
import { workspaceFormSchema } from "@/components/global/forms/workspace-form/shema"
import { useMutationData } from "./useMutationData"

export const useCreateWorkspace = () => {
  const {mutate, isPending} = useMutationData(
    ['create-workspace'], 
    (data: { name: string}) => (createWorkspace(data.name)),
    'user-workspaces'
  )

  const {errors, onFormSubmit, register} = useZodForm(workspaceFormSchema, mutate)

  return {
    errors, 
    onFormSubmit, 
    register, 
    isPending
  }
}