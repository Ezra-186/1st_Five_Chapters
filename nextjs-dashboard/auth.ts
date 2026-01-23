// import NextAuth from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';
// import { z } from 'zod';
// import postgres from 'postgres';
// import bcrypt from 'bcrypt';
// import type { User } from '@/app/lib/definitions';
// import { authConfig } from './auth.config';

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// async function getUser(email: string): Promise<User | undefined> {
//   try {
//     const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
//     return user[0];
//   } catch {
//     throw new Error('Failed to fetch user.');
//   }
// }

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const parsed = z
//           .object({
//             email: z.string().email(),
//             password: z.string().min(6),
//           })
//           .safeParse(credentials);

//         if (!parsed.success) return null;

//         const { email, password } = parsed.data;

//         const user = await getUser(email);
//         if (!user) return null;

//         const passwordsMatch = await bcrypt.compare(password, user.password);
//         if (!passwordsMatch) return null;

//         return user;
//       },
//     }),
//   ],
// });


import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log('RAW CREDENTIALS:', credentials);

        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        console.log('PARSED:', parsedCredentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;

        const user = await getUser(email);
        if (!user) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) return null;

        return user;
      },
    }),
  ],
});