import mongoose from "mongoose";

export const DbConnect=async()=>{
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL)
    let connection=mongoose.connection
    connection.on('connected',()=>{
        console.log('database connected successfully')
    })
    connection.on('error',(err)=>{
        console.log('database connected' + err)
        process.exit(1)
    })
}
DbConnect()