import express from 'express'
const chatRoutes = express.Router()
import { chathandle  ,getchat  } from '../controllers/chat.controllers.js'
import authmiddleware from '../middlewares/auth.middlewars.js'

chatRoutes.post("/chatstart" , authmiddleware  , chathandle)
chatRoutes.get("/getchat" , authmiddleware  , getchat)



export default chatRoutes




