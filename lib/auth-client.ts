import { createAuthClient } from "better-auth/react"

/**
 * Single shared better-auth client.
 *
 * `baseURL` falls back to the current origin when unset, which is what you
 * want while the app and `/api/auth` are served from the same host. If the
 * API ever moves to another domain, set `NEXT_PUBLIC_BETTER_AUTH_URL`.
 */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
})

export const { signIn, signUp, signOut, useSession } = authClient
