import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    password:{
        required:false,
        type:String,
        required:[true,'password is required']
    },
    role:{
         type:String,
         default:'user'
    }
    
})

const userModel=mongoose.models.users || mongoose.model('users',userSchema)
export default userModel