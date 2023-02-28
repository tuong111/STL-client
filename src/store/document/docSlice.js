
import { createSlice } from '@reduxjs/toolkit';
import { getAllDoc } from './docAction';
const docSlice = createSlice({
    name : 'document',
    initialState : {
        loading : false,
        listDocument : [],
        message : null
    },
    reducers : {},
    extraReducers : builder => {
        builder.addCase(getAllDoc.pending, state => {
            state.loading = true
        })
        .addCase(getAllDoc.fulfilled,( state,action) => {
            state.loading = false
            state.listDocument = action.payload
            state.message = action.payload.message
        })
        .addCase(getAllDoc.rejected, state => {
            state.loading = false
            state.message = null
        })
    }
})

export const {} = docSlice.actions
export default docSlice.reducer