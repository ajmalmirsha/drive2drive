import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    id: "",
    email: "",
    username:'',
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdminDetails: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.username= action.payload.username;
        }
    }
})

export const { setAdminDetails } = adminSlice.actions;
export default adminSlice.reducer;