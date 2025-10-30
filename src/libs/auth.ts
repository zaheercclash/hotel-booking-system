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
    async signIn({ user, account, profile }) {
      console.log("🔍 SIGNIN DEBUG:", {
        user: { id: user.id, email: user.email, name: user.name },
        account: { provider: account?.provider, type: account?.type },
        profile: { email: profile?.email, name: profile?.name },
      });
      return true;
    },

    async redirect({ url, baseUrl }) {
      console.log("🔍 REDIRECT DEBUG:", {
        url,
        baseUrl,
        nextauthUrl: process.env.NEXTAUTH_URL,
      });
      return process.env.NEXTAUTH_URL || baseUrl;
    },

    async jwt({ token, user, account, profile }) {
      console.log("🔍 JWT DEBUG:", { token, user, account, profile });
      return token;
    },

    async session({ session, token }) {
      try {
        const userEmail = token.email;
        console.log(
          "🔍 SESSION DEBUG - Looking for user with email:",
          userEmail
        );

        // First try to find published user
        const userIdObj = await sanityClient.fetch<{ _id: string }>(
          `*[_type == "user" && email == $email && !(_id in path("drafts.**"))][0] { _id }`,
          { email: userEmail }
        );

        console.log("🔍 SESSION DEBUG - Published user found:", userIdObj);

        let userId = userIdObj?._id;

        // If no published user found, try to find any user (including drafts)
        if (!userId) {
          const anyUser = await sanityClient.fetch<{ _id: string }>(
            `*[_type == "user" && email == $email][0] { _id }`,
            { email: userEmail }
          );
          userId = anyUser?._id;
          console.log("🔍 SESSION DEBUG - Any user found:", anyUser);

          // Remove 'drafts.' prefix if it's a draft document
          if (userId && userId.startsWith("drafts.")) {
            userId = userId.replace("drafts.", "");
            console.log("🔍 SESSION DEBUG - Cleaned user ID:", userId);
          }
        }

        console.log("🔍 SESSION DEBUG - Final user ID for session:", userId);

        return {
          ...session,
          user: {
            ...session.user,
            id: userId || token.sub, // Fallback to token.sub if no user ID found
          },
        };
      } catch (error) {
        console.error("🔍 SESSION ERROR:", error);
        return session;
      }
    },
  },
  events: {
    async createUser({ user }) {
      console.log("🔍 CREATE USER EVENT:", user);
    },
    async linkAccount({ user, account, profile }) {
      console.log("🔍 LINK ACCOUNT EVENT:", { user, account, profile });
    },
    async signIn({ user, account, profile }) {
      console.log("🔍 SIGNIN EVENT:", { user, account, profile });
    },
  },
};
