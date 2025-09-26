import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const authmiddleware = async (req, res , next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(404).json({message:"token not found"})
        }
        console.log(token)

        const decode = jwt.verify(token , process.env.JWT_SECRET)
        console.log(decode)
        const user = await User.findById(decode.id)
        req.user = user 
        next()
    }
   catch(error){
  console.log(error);
  return res.status(500).json({ message: "Server error" });
}
}
export default authmiddleware