import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
  secret: process.env.NEXTAUTH_SECRET || "raj_portfolio_secret_key_2204_sliet",
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        // @ts-ignore
        session.user.id = token.sub;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
