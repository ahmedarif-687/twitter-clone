import mongoose from "mongoose"

const tweetschema=new mongoose.Schema({

    description: {
        type: String,
        required: true,
    },
    like: {
        type: Array,
        default:[]
    },
   
    userid:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
    },
    userDetails:{
        type:Array,
        default:[],
    }
   
    
},{timestamps:true})

export const tweet=mongoose.model("tweet",tweetschema)