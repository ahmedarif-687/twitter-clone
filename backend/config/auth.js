import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config({
    path: "../config/.env"
})
const isauthenticated = async (req, res, next) => {
    try {
      const token=req.cookies.token
      console.log(token);
      if(!token){
        return res.status(401).json({message:"Please login to access this resource."})
      }
        const decode = await jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode);
        req.user = decode.userid;
        next();
    } catch (error) {
        res.status(401).json({ message: "unauthorized" })
    }

}

export default isauthenticated;