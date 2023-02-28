
import { createAsyncThunk } from '@reduxjs/toolkit';
import classServices from '../../services/classServices';
export const getListClass = createAsyncThunk(
    'class/getClass',
    async (data, thunkAPI) => {
        const {token} = data
        const res = await classServices.getListClass(token)
        return res
    }
)