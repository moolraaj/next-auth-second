import { DbConnect } from "@/database/databse"; 
import userModel from "@/model/usermodel";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs' 

DbConnect()

export async function POST(){
    let hash=await bcryptjs.genSalt(10)
    let hashedPassword=await bcryptjs.hash('admin@123',hash) 

    let result=new userModel({
        name:'admin',
        email:'admin@gmail.com',
        password:hashedPassword,
        role:'admin'
    })
    await result.save()
    return NextResponse.json({success:true,status:200,message:'admin logged in successfully',result})
}