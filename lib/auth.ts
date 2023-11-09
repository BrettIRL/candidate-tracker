import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { compare } from 'bcryptjs';
import type { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db, getUserByEmail } from '@/db/respositories/users';

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          return null;
        }

        try {
          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            throw new Error('Both email and password are required');
          }

          const validPassword = await compare(password, user.password);
          if (!validPassword) {
            throw new Error('Invalid credentials');
          }

          const sanitizedUser = {
            ...user,
            password: undefined,
          };
          delete sanitizedUser.password;

          return sanitizedUser;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (!user) {
        return token;
      }

      return {
        id: user.id,
        name: user.name!,
        email: user.email!,
      };
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name!;
        session.user.email = token.email;
      }

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};
