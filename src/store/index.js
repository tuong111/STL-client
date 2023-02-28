import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import userReducer from './userData/userdataSlice'
import classReducer from './class/classSlice'
import documentReducer from './document/docSlice'
export const store = configureStore({
    reducer: {
        auth : authReducer,
        userData : userReducer,
        class : classReducer,
        document : documentReducer
    },
})