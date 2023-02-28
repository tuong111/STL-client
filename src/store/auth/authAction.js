import { createAsyncThunk } from "@reduxjs/toolkit";
import userServices from '../../services/userServices';

export const userLogin = createAsyncThunk(
    'auth/login',
    async (data,thunkAPI) => {
        const {email,password} = data
        const res = await userServices.login(email,password)
        return res
    }
)
export const getUserById = createAsyncThunk(
    'auth/getUserByID',
    async (data, thunkAPI) => {
        const {id,token} = data
        const res = await userServices.getUserInfoById(id,token)
        return res
    }
)