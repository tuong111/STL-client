import { createSlice } from "@reduxjs/toolkit";
import { getUserById, userLogin } from "./authAction";

const authSlice = createSlice({
    name :'user',
    initialState : {
        isLogin : false,
        userInfo : {},
        token : null,
        loading : null,
        message : null,
        success : false
    },
    reducers : {
        logOut : (state) => {
            state.isLogin = false
            state.userInfo = {}
            state.token = null
            state.loading = null
            state.message = null
            state.success = null
            localStorage.removeItem('token')
        },
        userRemember : (state,action) => {
            state.isLogin = true
            state.token = action.payload.token
        }
    },
    extraReducers : builder => {
        builder.addCase(userLogin.pending, (state)=> {
            state.loading = true
        })
        .addCase(userLogin.fulfilled, (state,action)=>{
            state.loading = false
            state.token = action.payload.accessToken
            localStorage.setItem('token',action.payload.accessToken)
            state.isLogin = true
            state.message = action.payload.message
            state.success = action.payload.success
        })
        .addCase(userLogin.rejected,state => {
            state.loading = false
        })
        .addCase(getUserById.pending, (state) => {
            state.loading = true
        })
        .addCase(getUserById.fulfilled , (state, action) => {
            state.loading = false
            state.userInfo = action.payload.userInfo
            state.isLogin = true
            state.token = localStorage.getItem('token')
        })
        .addCase(getUserById.rejected , state => {
            state.loading = false
        })
    }
})

export const {logOut,userRemember} = authSlice.actions
export default  authSlice.reducer