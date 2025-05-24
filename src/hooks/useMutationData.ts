import { 
    MutateFunction, 
    MutationKey, 
    useMutation, 
    useQueryClient 
} from "@tanstack/react-query";
import { toast } from "./use-toast";

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
            return toast({
                title:
                data.status === 200
                    ? "Success"
                    : "Error",
                description: data.data
            });
        },
        onSettled: async () => {
            return await client.invalidateQueries({queryKey: [queryKey]})
        }
    })

    return {mutate, isPending}
}