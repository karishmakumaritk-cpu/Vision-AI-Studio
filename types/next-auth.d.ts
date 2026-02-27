import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      role: string;
      subscription_status: string;
      trial_end: string | null;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string;
    role: string;
    subscription_status: string;
    trial_end: string | null;
  }
}
