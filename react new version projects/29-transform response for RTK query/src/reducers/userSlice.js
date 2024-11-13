import { createSlice, createAsyncThunk, nanoid, createEntityAdapter,createSelector } from '@reduxjs/toolkit'
import { createUser, deleteUser, getALllUsers } from '../services/blogsServices'
import { apiSlice } from '../api/apiSlice'
// import { selectUserById } from './userSlice';

const userAdaptor = createEntityAdapter()
const initialState = userAdaptor.getInitialState()


export const extendedApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getUsers:builder.query({
            query:()=>"/users",
            transformResponse:(responseData)=>{
                return userAdaptor.setAll(initialState,responseData)
                //بعد از نرمالایز کردن داده در کش ذخیره میشه
            },
            providesTags:["USERS"]
        }),
        addNewUser:builder.mutation({
            query:user=>({
                url:"/users",
                method:"POST",
                body:user
            }),
            invalidatesTags:["USERS"]
        }),
        deleteUSer:builder.mutation({
            query:userId=>({
                url:`/users/${userId}`,
                method:"DELETE"
            }),
            invalidatesTags:["USERS"]
        })
    })
})

// export const selcetUsersResult=apiSlice.endpoints.getUsers.select()
export const selcetUsersResult=extendedApiSlice.endpoints.getUsers.select()


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



const detructureData=extendedApiSlice.endpoints.getUsers.matchFulfilled
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchUsers.fulfilled, userAdaptor.setAll)
    //         .addCase(addNewApiUser.fulfilled, userAdaptor.addOne)
    //         .addCase(deleteApiUser.fulfilled, userAdaptor.removeOne)
    //     // with returning new result immer will replace exixting state with whaterever is returned
    // }
})

const selectUsersData=createSelector(
    selcetUsersResult,
    (usersResult)=>usersResult.data
)
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById
} = userAdaptor.getSelectors((state) =>selectUsersData(state)??initialState)

// export const selectAllUsers = (state) => state.users
// export const selectUserById = (state, userId) => {
//     return state.users.find(user => user.id == userId)
// }

export const {useGetUsersQuery,
useAddNewUserMutation,
useDeleteUSerMutation
}=extendedApiSlice
export default usersSlice.reducer

