import express from 'express'
   
const authRoutes = express.Router()
import { signup , login , getuser  } from '../controllers/auth.controllers.js'
import authmiddleware from '../middlewares/auth.middlewars.js'

authRoutes.post("/signup" , signup)
authRoutes.post("/login" , login)
authRoutes.get("/getuser" , authmiddleware ,getuser)


export default authRoutes

