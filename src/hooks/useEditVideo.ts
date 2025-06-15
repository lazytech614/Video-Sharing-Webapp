import { editVideoInfoSchema } from "@/components/global/forms/edit-video/shema"
import { useZodForm } from "./useZodForm"
import { useMutationData } from "./useMutationData"
import { editVideoInfo } from "@/actions/workspace"

export const useEditVideo = (videoId: string, title: string, description: string) => {
    const {mutate, isPending} = useMutationData(
        ['edit-video'], 
        (data: { videoId: string, title: string, description: string}) => editVideoInfo(videoId, data.title, data.description),
        'preview-video'
    )

    const {errors, onFormSubmit, register} = useZodForm(editVideoInfoSchema, mutate, {title, description})

    return {errors, onFormSubmit, register, isPending}
}
