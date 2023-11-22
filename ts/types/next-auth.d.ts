import { JWT } from 'next-auth/jwt';

interface IUser {
  id: string;
  name: string;
  email: string;
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    name: string;
    email: string;
  }
}

declare module 'next-auth' {
  interface Session {
    user: IUser;
  }
}
