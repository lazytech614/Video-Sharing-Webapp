import { MutationKey, useMutationState } from "@tanstack/react-query";

export const useMutationDataState = (mutationKey: MutationKey) => {
    const data = useMutationState({
        filters: {mutationKey},
        select: (mutation) => {
            return {
                variables: mutation.state.variables as any,
                status: mutation.state.status,
            }
        }
    })

    const latestVaribles = data[data.length - 1]
    return {latestVaribles}
}