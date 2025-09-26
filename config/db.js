import mongoose from "mongoose";

const ConnectDb = async function (next){
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("app connect to database")
    }
    catch(error){
        process.exit(1)
    }
}
export default ConnectDb