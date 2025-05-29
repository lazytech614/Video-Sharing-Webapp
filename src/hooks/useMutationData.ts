import { 
    MutationKey, 
    useMutation, 
    useQueryClient 
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useMutationData = (
    mutationKey: MutationKey, 
    mutationFn: (variables: any) => Promise<any>,
    queryKey?: string,
    onSuccess?: () => void
) => {
    const client = useQueryClient()
    const {mutate, isPending} = useMutation({
        mutationKey, 
        mutationFn,
        onSuccess(data) {
            if(onSuccess) 
                onSuccess()
            if(data.status === 200 || data.status === 201) {
                return toast.success(data.message || "Success");
            }
        },
        onSettled: async () => {
            return await client.invalidateQueries({queryKey: [queryKey]})
        }
    })

    return {mutate, isPending}
}