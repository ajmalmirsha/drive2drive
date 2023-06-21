import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    id: "",
    username: "",
    email: "",
    phone: null,
    image: "",
    dob: null,
    license: {
        front: '',
        back: '',
        verification:'',
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.image = action.payload.image;
            state.dob = action.payload.dob
            state.license.front = action.payload.license.front
            state.license.back = action.payload.license.back
            state.license.verification = action.payload.license.verification
        }
    }
})

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;