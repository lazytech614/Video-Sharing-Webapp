import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type initialStateProps = {
    workspaces: ({
        id: string,
        name: string,
        type: 'PUBLIC' | 'PERSONAL',
    })[]
}

const initialState: initialStateProps = {
    workspaces: []
}

export const workspaceSlice = createSlice({
    name: 'workspaces',
    initialState,
    reducers: {
        WORKSPACES: (state, action: PayloadAction<initialStateProps>) => {
            return { ...action.payload }
        }
    }
})

export const { WORKSPACES } = workspaceSlice.actions
export default workspaceSlice.reducer