import axios from "axios";
import NextAuth from "next-auth";
import Providers from "next-auth/providers/credentials";
import { server } from "../../../configs/server";

const options = {
  providers: [
    Providers({
      // id: "myProvider",
      name: "username",
      credentials: {
        username: { label: "username", type: "text", placeholder: "johndoe" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (credentials.username === undefined && credentials.password === undefined) {
          return "/signin";
        }

        const url = `${server}/api/users/login`;
        const {
          data: { data: user },
        } = await axios.post(url, credentials);

        if (user) {
          return user;
        } else {
          return "/signin?error=invalid_credentials";
        }
      },
      pages: { signIn: "/signin", signOut: "/signin" },
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    secret: "INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw",
    // signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  theme: {
    colorScheme: "auto",
    logo: "/images/logo.png",
    brandColor: "#3b82f6",
  },
  callbacks: {
    async jwt({ token, account }) {
      // add fields to the jwt token
      if (account) {
        // token.test = "test token";
      }
      return token;
    },
    async session({ session, user, token }) {
        const {
          data: { data },
        } = await axios.get(`${server}/api/users/${token.sub}`);

        session.user.id = token.sub;
        session.user.username = data.username;

      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (typeof user !== "string") {
        return true;
      } else if (user === "/signin") {
        return "/signin";
      } else {
        return "/signin?error=invalid_credentials";
      }
    },
    // redirect({ url, baseUrl }) {
    //   return url.startsWith(baseUrl) ? url : baseUrl;
    // },
  },
};

export default (req, res) => NextAuth(req, res, options);
