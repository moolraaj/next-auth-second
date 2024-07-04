 
import userModel from '@/model/usermodel';
import { LoginSchema } from '@/validators/authvalidators';
import ErrorReporter from '@/validators/errorreporter';
import vine, { errors } from '@vinejs/vine';
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { DbConnect } from '@/database/databse';

DbConnect()

export async function POST(req) {
  try {
    let payload = await req.json();
    const validator = vine.compile(LoginSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(payload);
    let { email, password } = output;

    if (!email || !password) {
      return NextResponse.json({
        status: 400,
        errors:{

          message: 'Credentials are required',
        }
      });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      return NextResponse.json({
        status: 404,
        errors:{

          email: 'Credentials are required',
        }
      });
    }

    let checkedPass = await bcryptjs.compare(password, user.password);
    if (!checkedPass) {
      return NextResponse.json({
        status: 400,
        errors:{

          password: 'Credentials are required',
        }
      });
    }
    
    user = user.toObject();
    delete user.password;

    return NextResponse.json({
      status: 200,
      message: 'User successfully logged in',
      user,
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json({ status:400,success: false, errors: error.messages });
    }
  }
}
