// 'use server';
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '33a8b88a799763baa337';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || 'c56eed8a49cc41d855e5d1d913b395c73bb0c6b9';

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error("Missing GITHUB_CLIENT_ID or GITHUB_CLIENT");
}

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn,
} = NextAuth({
  providers: [
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET
    }),
    CredentialsProvider({
      async authorize(credentials: any) {
        return {
          name: credentials.name,
          email: credentials.email,
          image: credentials.image,
          id: credentials.id,
          token: credentials.accessToken,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account, profile }) => {
      return { ...token, ...user };
    },
    async session({ session, token }: any) {
      if (session && token) {
        session.user.token = token.token;
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET || 'my-secret',
});
