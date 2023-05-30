import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    id: "",
    email: "",
    phone: null,
    image: "",
    username:'',
    adminverify:null,
    dob:''
}

const ownerSlice = createSlice({
    name: 'owner',
    initialState,
    reducers: {
        setOwnerDetails: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.image = action.payload.image;
            state.username= action.payload.username;
            state.adminverify = action.payload.adminverify;
            state.dob= action.payload.dob
        }
    }
})

export const { setOwnerDetails } = ownerSlice.actions;
export default ownerSlice.reducer;