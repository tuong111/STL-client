
import { createSlice } from '@reduxjs/toolkit';
import { getListClass } from './classAction';
const classSlice = createSlice({
    name : 'class',
    initialState : {
        loading : false,
        listClass : [],
        message : null
    },
    reducers : {},
    extraReducers : builder => {
        builder.addCase(getListClass.pending, state => {
            state.loading = true
        })
        .addCase(getListClass.fulfilled,( state,action) => {
            state.loading = false
            state.listClass = action.payload.listClass
            state.message = action.payload.message
        })
        .addCase(getListClass.rejected, state => {
            state.loading = false
            state.message = null
        })
    }
})

export const {} = classSlice.actions
export default classSlice.reducer