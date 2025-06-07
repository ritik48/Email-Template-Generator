import NextAuth from "next-auth";

import { User } from "@/app/_models/user.model";

import Credentials from "next-auth/providers/credentials";
import { connectDB } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
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
          // If the user does not exist, you can throw an error or handle it as needed
          return null;
        }

        if (user.password !== password) {
          return null; // If the password does not match, return null
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
});
