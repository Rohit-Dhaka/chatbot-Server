import express from 'express'
const app = express()
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
const PORT = process.env.PORT || 4040
import ConnectDb from '../server/config/db.js'
import routes from './routes/index.js'




app.use(express.json())
app.use(cors())
app.use('/api/v1' , routes)






ConnectDb()
app.listen(PORT , ()=>{
    console.log(`app listening on port ${PORT}`)
})