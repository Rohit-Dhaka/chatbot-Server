import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


 async function signup (req, res)  {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

        
    user = await User.create({ name, email, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

async function login (req, res) {
  const { email, password } = req.body;
  try {
    
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(  password ,user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message:"user login successfully",token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

async function getuser (req, res){
  try{
    const id = req.user.id
    
    const user = await User.findById(id)
    if(!user) {
      return res.status(400).json({message:"User not found"})
    }

    return res.status(200).json({message:"User found successfully" ,user})
  }
  catch(error){
    console.log(error)
  }
}




export { signup , login , getuser  }
