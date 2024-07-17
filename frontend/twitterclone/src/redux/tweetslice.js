import { createSlice } from "@reduxjs/toolkit";

const tweetslice = createSlice({
    name: "tweet",
    initialState: {
        tweets: null,
        refresh:false,
        isActive:true
        },
    reducers: {
        //multiple actions
        getalltweets: (state, action) => {
            state.tweets = action.payload;
        },
        getRefresh:(state)=>{
            state.refresh = !state.refresh;
        },
        getisActive:(state,action)=>{
            state.isActive = action.payload;
        }
       
    }
})

export const { getalltweets,getRefresh, getisActive} = tweetslice.actions;
export default tweetslice.reducer
