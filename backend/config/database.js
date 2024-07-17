import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config({
    path:"../config/.env"
})
const databaseconnection=()=>{
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Database connected")
}).catch((error)=>{
    console.log(error)
})}

export default databaseconnection;