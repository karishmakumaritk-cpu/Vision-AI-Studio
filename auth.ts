import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { supabaseAdmin } from './lib/supabase'

export const authOptions: NextAuthOptions = {
  // ✅ FIX: Must use JWT strategy (no DB adapter needed)
  session: { strategy: 'jwt' },

  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    // ─── GOOGLE OAUTH ───────────────────────────────
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      // ✅ FIX: Force account selection every time
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),

    // ─── EMAIL + PASSWORD ────────────────────────────
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const { data: user, error } = await supabaseAdmin
          .from('users')
          .select('*')
          .eq('email', credentials.email)
          .single()

        if (error || !user) return null
        if (!user.password_hash) return null // OAuth user, no password

        const isValid = await bcrypt.compare(credentials.password, user.password_hash)
        if (!isValid) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          subscription_status: user.subscription_status,
        }
      },
    }),
  ],

  callbacks: {
    // ─── SIGN IN (Handle Google OAuth upsert) ───────
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const { data: existing } = await supabaseAdmin
          .from('users')
          .select('id')
          .eq('email', user.email!)
          .single()

        if (!existing) {
          // New Google user — create with trial
          const now = new Date()
          const trialEnd = new Date(now.getTime() + 24 * 60 * 60 * 1000)

          const { error } = await supabaseAdmin.from('users').insert({
            name: user.name,
            email: user.email,
            avatar_url: user.image,
            role: 'user',
            trial_start: now.toISOString(),
            trial_end: trialEnd.toISOString(),
            subscription_status: 'trial',
          })

          if (error) {
            console.error('Google signup DB error:', error)
            return false
          }
        }
      }
      return true
    },

    // ─── JWT (Store role in token) ──────────────────
    async jwt({ token, user, account }) {
      if (user) {
        // On initial sign-in, fetch fresh data from DB
        const { data: dbUser } = await supabaseAdmin
          .from('users')
          .select('id, role, subscription_status, trial_end')
          .eq('email', token.email!)
          .single()

        if (dbUser) {
          token.userId = dbUser.id
          token.role = dbUser.role
          token.subscription_status = dbUser.subscription_status
          token.trial_end = dbUser.trial_end
        }
      }
      return token
    },

    // ─── SESSION (Expose token data to client) ──────
    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId as string
        session.user.role = token.role as string
        session.user.subscription_status = token.subscription_status as string
        session.user.trial_end = token.trial_end as string | null
      }
      return session
    },
  },

  pages: {
    signIn: '/signin',
    error: '/signin', // Redirect OAuth errors to signin page
  },
}
