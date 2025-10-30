import { NextAuthOptions } from "next-auth";
import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import sanityClient from "./sanity";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    SanityCredentials(sanityClient),
  ],
  session: {
    strategy: "jwt",
  },
  adapter: SanityAdapter(sanityClient),
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      const userEmail = token.email;

      // FIX: Fetch user and handle draft/published documents
      const userIdObj = await sanityClient.fetch<{ _id: string }>(
        `*[_type == "user" && email == $email && !(_id in path("drafts.**"))][0] {
            _id
        }`,
        { email: userEmail }
      );

      // If no published user found, try to find any user (including drafts)
      let userId = userIdObj?._id;

      if (!userId) {
        const anyUser = await sanityClient.fetch<{ _id: string }>(
          `*[_type == "user" && email == $email][0] {
              _id
          }`,
          { email: userEmail }
        );
        userId = anyUser?._id;

        // Remove 'drafts.' prefix if it's a draft document
        if (userId && userId.startsWith("drafts.")) {
          userId = userId.replace("drafts.", "");
        }
      }

      console.log("🔍 AUTH DEBUG: User ID for session:", userId);

      return {
        ...session,
        user: {
          ...session.user,
          id: userId || token.sub, // Fallback to token.sub if no user ID found
        },
      };
    },
  },
};
