import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    TwitterProvider({
      clientId:process.env.Twitter_Client_id,
      clientSecret:process.env.Twitter_Client_SECRET,
      version:'2.0',
    }),
    // ...add more providers here
  ],
})