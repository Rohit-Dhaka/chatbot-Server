import axios from 'axios';
import Chat from '../models/Chat.js';
import User from '../models/User.js';



async function chathandle (req,res){
    try{
    const{ message} = req.body;
    if (!message) {
  return res.status(400).json({ error: 'Message is required' });
}
        if (!req.user || !req.user._id) {
  return res.status(401).json({ error: 'Unauthorized: User not found' });
}
        
        const userMes = await Chat.create({ sender:"user" , text:message , userId: req.user._id })
        const response = await axios.post('https://api.groq.com/openai/v1/chat/completions',{
            model:'llama-3.1-8b-instant',
            messages: [{role:"user" , content: message}]
        },{
            headers: {Authorization: `Bearer ${process.env.GROQ_API_KEY}`}
        })    
        const botReply = await response.data.choices[0].message.content; 
        const botmessage = await Chat.create({sender:'bot' , text: botReply , userId: req.user._id })
            return res.status(201).json({
            message: "Bot reply",
            userMessage: userMes,
            botMessage: botmessage
        });

    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:"Interna server error"})
    }
}


async function getchat (req,res){
    try{
        
        const chats = await Chat.find({userId: req.user._id}).sort({timestamp :1})
        if(!chats){
            return res.status(404).json({message:"chats not found"})
        }
         res.status(200).json({message:"Chat  found" , chats})
        
    }
    catch(error){
        return res.status(500).json({error:"Interna server error"})
    }
}

export { chathandle , getchat}