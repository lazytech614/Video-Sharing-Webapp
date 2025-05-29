import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type intitalStateProps = {
    workspaces: {
        id: string,
        name: string,
        type: 'PERSONAL' | 'PUBLIC'
    }[]
}

const intitalState: intitalStateProps = {
    workspaces: [],
};

export const Workspaces = createSlice({
    name: 'workspaces',
    initialState: intitalState,
    reducers: {
        WORKSPACES: (state: any, action: PayloadAction<intitalStateProps>) => {
            return {...action.payload};
        }
    },
});

export const { WORKSPACES } = Workspaces.actions;
export default Workspaces.reducer;
