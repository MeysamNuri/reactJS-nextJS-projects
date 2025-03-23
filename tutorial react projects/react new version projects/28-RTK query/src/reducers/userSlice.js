import { createSlice, createAsyncThunk, nanoid, createEntityAdapter,createSelector } from '@reduxjs/toolkit'
import { createUser, deleteUser, getALllUsers } from '../services/blogsServices'
import { apiSlice } from '../api/apiSlice'
// import { selectUserById } from './userSlice';




export const extendedApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getUsers:builder.query({
            query:()=>"/users"
        })
    })
})

// export const selcetUsersResult=apiSlice.endpoints.getUsers.select()
export const selcetUsersResult=extendedApiSlice.endpoints.getUsers.select()

const emptyUser=[]
export const selectAllUsers=createSelector(
    selcetUsersResult,
    (userResult)=>userResult?.data??emptyUser
)

export const selectUserById=createSelector(
    selectAllUsers,
    (state,userId)=>userId,
    (users,userId)=>users.find((user)=>user.id===userId)
)
// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//     const response = await getALllUsers()
//     return response.data
// })

// export const deleteApiUser = createAsyncThunk("users/deleteApiUser", async (userId) => {
//     await deleteUser(userId)
//     return userId
// })

// export const addNewApiUser = createAsyncThunk("users/addNewApiUser", async (initialUser) => {
//     const response = await createUser(initialUser)
//     return response.data
// })

// const userAdaptor = createEntityAdapter()
// const initialState = userAdaptor.getInitialState()

const usersSlice = createSlice({
    name: "users",
    initialState:emptyUser,
    reducers: {},
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchUsers.fulfilled, userAdaptor.setAll)
    //         .addCase(addNewApiUser.fulfilled, userAdaptor.addOne)
    //         .addCase(deleteApiUser.fulfilled, userAdaptor.removeOne)
    //     // with returning new result immer will replace exixting state with whaterever is returned
    // }
})
// export const {
//     selectAll: selectAllUsers,
//     selectById: selectUserById
// } = userAdaptor.getSelectors((state) => state.users)

// export const selectAllUsers = (state) => state.users
// export const selectUserById = (state, userId) => {
//     return state.users.find(user => user.id == userId)
// }

export const {useGetUsersQuery}=extendedApiSlice
export default usersSlice.reducer

