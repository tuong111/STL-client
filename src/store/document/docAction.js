
import { createAsyncThunk } from '@reduxjs/toolkit';
import classServices from '../../services/classServices';
import docServices from '../../services/docServices';
export const getAllDoc = createAsyncThunk(
    'document/getAllDoc',
    async (data, thunkAPI) => {
        const {token} = data
        const res = await docServices.getAllDoc(token)
        return res
    }
)