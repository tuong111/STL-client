
import { createSlice, current } from '@reduxjs/toolkit';
import { deleteUser, getAllUser } from './userDataAction';
const userDataSlice = createSlice({
    name : 'userData',
    initialState : {
        listUser : [],
        loading : false
    },
    reducers : {

    },
    extraReducers : builder => {
        builder.addCase(getAllUser.pending, state => {
            state.loading = true
        })
        .addCase(getAllUser.fulfilled, (state,action) => {
            state.loading = false
            state.listUser = action.payload
        })
        .addCase(getAllUser.rejected, state => {state.loading = false})
        .addCase(deleteUser.pending, state => {state.loading = true})
        .addCase(deleteUser.fulfilled, (state,action) => {
            state.loading = false
            const currentList = current(state).listUser
            const newList = currentList.filter(item => item._id !== action.payload.deleteID)
            state.listUser = newList
        })
        .addCase(deleteUser.rejected,state => {
            state.loading = false
        })
    }
})

export const { } = userDataSlice.actions
export default userDataSlice.reducer