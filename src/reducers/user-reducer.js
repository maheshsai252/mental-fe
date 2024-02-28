import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        user: null,
        currentUser: {},
        error: null
    },
    reducers: {
        updateUser(state, action) {
            return {
                ...state,
                ...action.payload
            }
        },
    },
  
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;