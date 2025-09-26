import express from 'express'
const routes = express.Router()
import authRoutes from './auth.routes.js'
import chatRoutes from './chat.route.js'


routes.use("/auth" , authRoutes)
routes.use("/chat" , chatRoutes)

export default routes