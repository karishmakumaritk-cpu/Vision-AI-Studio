/** @type {import('next').NextConfig} */

// Vercel automatically sets VERCEL_URL to the current deployment's dynamic URL
// (e.g. vision-ai-studio-80hlc8w72-velisions-projects.vercel.app for preview builds).
// NextAuth uses NEXTAUTH_URL to construct the OAuth redirect_uri sent to Google.
// If NEXTAUTH_URL is not explicitly set, NextAuth falls back to VERCEL_URL, which
// produces a redirect_uri that was never registered in Google Console → Error 400.
// Fix: when NEXTAUTH_URL is absent, pin it to the stable canonical production URL.
if (!process.env.NEXTAUTH_URL && process.env.NEXT_PUBLIC_APP_URL) {
  process.env.NEXTAUTH_URL = process.env.NEXT_PUBLIC_APP_URL;
}

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

export default nextConfig;
