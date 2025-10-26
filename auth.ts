import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// Extend NextAuth types to include id in session.user
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Check against environment variables
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
          console.error("Admin credentials not configured in environment");
          return null;
        }

        // Verify email
        if (credentials.email !== adminEmail) {
          return null;
        }

        // Verify password (supports both plain and hashed)
        let isValid = false;
        if (adminPassword.startsWith("$2a$") || adminPassword.startsWith("$2b$")) {
          // Hashed password
          isValid = await bcrypt.compare(credentials.password, adminPassword);
        } else {
          // Plain password (for initial setup)
          isValid = credentials.password === adminPassword;
        }

        if (!isValid) {
          return null;
        }

        // Return user object
        return {
          id: "1",
          email: adminEmail,
          name: "Admin",
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
