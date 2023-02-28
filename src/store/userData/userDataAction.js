
import { createAsyncThunk } from '@reduxjs/toolkit';
import userServices from '../../services/userServices';


export const getAllUser = createAsyncThunk(
    'userData/getAllUser',
    async(data,thunkAPI) => {
        const {token,role} = data
        const res = await userServices.getListUsers(token,role)
        return res
    }
)

export const deleteUser = createAsyncThunk(
    'userData/deleteUser',
    async (data,thunkAPI) => {
        const {token,userID} = data
        const res = await userServices.deleteUser(token,userID)
        return {
            res : res,
            deleteID : userID
        }
    }
)