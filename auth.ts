import NextAuth from "next-auth";

import { User } from "@/app/_models/user.model";

import Credentials from "next-auth/providers/credentials";
import { connectDB } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async ({ email, password }) => {
        if (!email || !password) {
          throw new Error("Invalid credentials.");
        }

        await connectDB();

        const user = await User.findOne({ email });
        if (!user) {
          return null;
        }

        if (user.password !== password) {
          return null;
        }

        console.log("User authenticated:", user);

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ token, session }) {
      if (session && session.user) {
        session.user.email = token.email!;
        session.user._id = token.sub!;
      }

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
