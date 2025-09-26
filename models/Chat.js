import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({
    text:{
        type:String,        
    },
    sender:{
        type:String
    },
    timestamp:{
        type: Date,
        default: Date.now
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
const Chat = mongoose.model("Chat" , chatSchema)
export default Chat