import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"
import type { auth } from "@/lib/auth"

/**
 * Single shared better-auth client.
 *
 * `baseURL` falls back to the current origin when unset, which is what you
 * want while the app and `/api/auth` are served from the same host. If the
 * API ever moves to another domain, set `NEXT_PUBLIC_BETTER_AUTH_URL`.
 */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
  // Surface server `user.additionalFields` (e.g. `role`) on client actions
  // like `signUp.email`. Type-only import — no server code is bundled.
  plugins: [inferAdditionalFields<typeof auth>()],
})

export const { signIn, signUp, signOut, useSession } = authClient
