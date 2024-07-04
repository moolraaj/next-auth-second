import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'login',
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
      async authorize(credentials, req) {
        const user = { id: '1', name: 'raaj', email: credentials?.email }

        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
}
