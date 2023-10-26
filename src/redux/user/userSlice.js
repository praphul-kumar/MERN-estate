import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    successMsg: null,
    error: null,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        requestStart: (state) => {
            state.loading = true;
        },
        userRequestSuccess: (state, action) => {
            state.currentUser = action.payload.user;
            state.loading = false;
            state.successMsg = action.payload.message
            state.error = null;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.successMsg = null;
            state.error = null;
        },
        requestFailed: (state, action) => {
            state.error = action.payload;
            state.successMsg = null;
            state.loading = false;
        },
        updateMessage: (state, action) => {
            if (action.payload != null) {
                if (action.payload.type == 'success') {
                    state.successMsg = action.payload.message;
                } else if (action.payload.type == 'error') {
                    state.error = action.payload.message;
                }
            } else {
                state.successMsg = null;
                state.error = null
            }
        }
    }
});

export const { requestStart, userRequestSuccess, deleteUserSuccess, requestFailed, updateMessage }  = userSlice.actions;

export default userSlice.reducer;