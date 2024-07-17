import { createSlice } from "@reduxjs/toolkit";

const userslice = createSlice({
    name: "user",
    initialState: {
        user: null,
        otheruser: null,
        profile:null
    },
    reducers: {
        //multiple actions
        getuser: (state, action) => {
            state.user = action.payload;
        },
        getotheruser: (state, action) => {
            state.otheruser = action.payload;
        },
        getprofile: (state, action) => {
            state.profile = action.payload;
        },
        followingupdate:(state,action)=>{
          if (state.user.following.includes(action.payload)){
               state.user.following=state.user.following.filter((itemid)=>{
                return itemid!==action.payload
               })
          }else{
            state.user.following.push(action.payload)
          }
        }
    }
})

export const { getuser, getotheruser ,getprofile,followingupdate} = userslice.actions;
export default userslice.reducer
