import { DbConnect } from '@/database/databse'
import userModel from '@/model/usermodel'
import { NextResponse } from 'next/server'
import { registerSchema } from '@/validators/authvalidators'
import vine, { errors } from '@vinejs/vine'
import ErrorReporter from '@/validators/errorreporter'
import bycriptjs from 'bcryptjs'

DbConnect()

export async function POST(req, resp) {
  try {
    let payload = await req.json()
    const validator = vine.compile(registerSchema)
    validator.errorReporter = () => new ErrorReporter()
    const output = await validator.validate(payload)
    let { name, email, password } = output
    let isemail = await userModel.findOne({ email })
    if (isemail) {
      return NextResponse.json({ status: 400, errors:{email :'user already exist' }})
    }
    let salt = await bycriptjs.genSalt(10)
    let hashpassword = await bycriptjs.hash(password, salt)
    let user = new userModel({ name, email, password: hashpassword })
    await user.save()
    return NextResponse.json({ status:200,success: true,message:'user register successfully', user })
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json({ status:400,success: false, errors: error.messages })
    }
  }
}
