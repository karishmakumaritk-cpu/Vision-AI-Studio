import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    if (!token) return NextResponse.redirect(new URL('/signin', req.url))

    // Admin-only routes
    if (pathname.startsWith('/admin') && token.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    // Trial expiry check for dashboard
    if (pathname.startsWith('/dashboard') && token.role === 'user') {
      const status = token.subscription_status
      const trialEnd = token.trial_end ? new Date(token.trial_end) : null

      if (status === 'trial' && trialEnd && trialEnd < new Date()) {
        return NextResponse.redirect(new URL('/pricing?reason=trial_expired', req.url))
      }

      if (status === 'expired') {
        return NextResponse.redirect(new URL('/pricing?reason=subscription_expired', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
}
