import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type initialStateProps = {
    folders: ({
        _count: {
            videos: number
        }
    } & {
        id: string,
        name: string,
        createdAt: Date,
        updatedAt: Date,
        workSpaceId: string | null,
    }) []
}

const initialState: initialStateProps = {
    folders: []
}

export const folderSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        FOLDERS: (state, action: PayloadAction<initialStateProps>) => {
            return {...action.payload}
        }
    }
})

export const { FOLDERS } = folderSlice.actions
export default folderSlice.reducer