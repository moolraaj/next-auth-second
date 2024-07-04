import NextAuth from "next-auth"
import { authOptions } from "../options"
 
let handler=NextAuth(authOptions)


export default handler