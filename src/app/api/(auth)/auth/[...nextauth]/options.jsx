import { DbConnect } from '@/database/databse'
import userModel from '@/model/usermodel'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
 



export const authOptions = {


  callbacks: {
    async jwt({ token, user }) {
      if(user){
        user.role=user.role==null?'user':user.role
        token.user=user
      }
      return token
    },
  
    async session({ session, token }) {
      session.user=token.user
      return session
    },

},
 
  providers: [
    CredentialsProvider({
      name: 'next auth',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'enter your email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'enter your password',
        },
      },
      async authorize(credentials) {
        await DbConnect()
        const user = await userModel.findOne({ email: credentials?.email })

        if (user) {
         
          return user
        } else {
          return null
        }
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET_KEY
    })
  ],
  pages: {
    signIn: "/login"
  },
}
