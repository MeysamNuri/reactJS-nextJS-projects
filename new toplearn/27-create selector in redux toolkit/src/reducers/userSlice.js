import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit'
import { createUser, deleteUser, getALllUsers } from '../services/blogsServices'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await getALllUsers()
    return response.data
})

export const deleteApiUser = createAsyncThunk("users/deleteApiUser", async (userId) => {
    await deleteUser(userId)
    return userId
})

export const addNewApiUser = createAsyncThunk("users/addNewApiUser", async (initialUser) => {
    const response = await createUser(initialUser)
    return response.data
})
const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                return action.payload
            })
            .addCase(addNewApiUser.fulfilled, (state, action) => {
                state.push(action.payload)
            })
            .addCase(deleteApiUser.fulfilled, (state, action) => {
                return state.filter(user => user.id !== action.payload)
            })
        // with returning new result immer will replace exixting state with whaterever is returned
    }
})
export const selectAllUsers = (state) => state.users
export const selectUserById = (state, userId) => {
    return state.users.find(user => user.id == userId)
}
export default usersSlice.reducer

