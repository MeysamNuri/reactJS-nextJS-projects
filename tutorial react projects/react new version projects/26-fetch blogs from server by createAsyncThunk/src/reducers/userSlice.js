import { createSlice,createAsyncThunk,nanoid } from '@reduxjs/toolkit'
import { getALllUsers } from '../services/blogsServices'

export const fetchUsers=createAsyncThunk('users/fetchUsers',async ()=>{
    const response=await getALllUsers()
    return response.data
})
const usersSlice = createSlice({
    name: "users",
    initialState:[],
    reducers: {},
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
            return action.payload
        })
        // with returning new result immer will replace exixting state with whaterever is returned
    }
})
export const selectAllUsers=(state)=>state.users
export const selectUserById=(state,userId)=>{
   return state.users.find(user=>user.id==userId)
}
export default usersSlice.reducer

