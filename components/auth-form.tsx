"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

type AuthFormMode = "sign-in" | "sign-up"

export type UserRole = "seeker" | "recruiter" | "admin"

export interface AuthFormValues {
  name?: string
  email: string
  password: string
  role?: UserRole
}

const SIGN_UP_ROLES: { value: UserRole; label: string; hint: string }[] = [
  { value: "seeker", label: "Job seeker", hint: "Looking for work" },
  { value: "recruiter", label: "Recruiter", hint: "Hiring talent" },
  { value: "admin", label: "Admin", hint: "Manage platform" },
]

function isUserRole(value?: string): value is UserRole {
  return SIGN_UP_ROLES.some((role) => role.value === value)
}

interface AuthFormProps {
  mode: AuthFormMode
  /** Called with the collected form data. Throw to surface an error. */
  onSubmit: (data: AuthFormValues) => void | Promise<void>
}

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const router = useRouter()
  const isSignIn = mode === "sign-in"

  const [pending, setPending] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >

    if (!isSignIn && values.password !== values.confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (!isSignIn && !isUserRole(values.role)) {
      setError("Please choose whether you're a job seeker, recruiter or admin.")
      return
    }

    const data: AuthFormValues = {
      name: values.name,
      email: values.email,
      password: values.password,
      role: isSignIn ? undefined : (values.role as UserRole),
    }

    setError(null)
    setSuccess(null)
    setPending(true)

    try {
      await onSubmit(data)

      // Session cookie is set by the response — refresh so server components
      // pick up the new session, then leave the auth pages.
      setSuccess(
        isSignIn ? "Signed in successfully." : "Account created successfully."
      )
      router.refresh()
      router.replace("/")
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.6)] sm:p-8">
        <div className="mb-6">
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            {isSignIn ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {isSignIn
              ? "Sign in to continue to hireloop."
              : "Join hireloop to start hiring or get hired."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isSignIn && (
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="text-sm font-medium text-foreground"
              >
                Full name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Ada Lovelace"
                className="h-9"
                disabled={pending}
              />
            </div>
          )}

          {!isSignIn && (
            <fieldset className="space-y-1.5">
              <legend className="text-sm font-medium text-foreground">
                I am signing up as
              </legend>
              <div className="grid grid-cols-3 gap-2">
                {SIGN_UP_ROLES.map((option, index) => (
                  <label key={option.value} className="cursor-pointer">
                    <input
                      type="radio"
                      name="role"
                      value={option.value}
                      defaultChecked={index === 0}
                      required
                      disabled={pending}
                      className="peer sr-only"
                    />
                    <span className="flex h-full flex-col items-center gap-0.5 rounded-lg border border-input px-2 py-2.5 text-center transition-colors hover:border-ring peer-checked:border-indigo-500 peer-checked:bg-indigo-500/10 peer-checked:text-indigo-500 peer-focus-visible:ring-3 peer-focus-visible:ring-indigo-500/40 peer-disabled:pointer-events-none peer-disabled:opacity-50">
                      <span className="text-sm font-medium">
                        {option.label}
                      </span>
                      <span className="text-[11px] leading-tight text-muted-foreground">
                        {option.hint}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className="h-9"
              disabled={pending}
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </label>
              {isSignIn && (
                <button
                  type="button"
                  className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete={isSignIn ? "current-password" : "new-password"}
              minLength={8}
              required
              placeholder="••••••••"
              className="h-9"
              disabled={pending}
            />
          </div>

          {!isSignIn && (
            <div className="space-y-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-foreground"
              >
                Confirm password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                placeholder="••••••••"
                className="h-9"
                disabled={pending}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "auth-form-error" : undefined}
              />
            </div>
          )}

          {error && (
            <p
              id="auth-form-error"
              role="alert"
              className="text-sm font-medium text-destructive"
            >
              {error}
            </p>
          )}

          {success && (
            <p role="status" className="text-sm font-medium text-emerald-500">
              {success}
            </p>
          )}

          <Button
            type="submit"
            disabled={pending}
            className="h-9 w-full bg-indigo-600 text-white hover:bg-indigo-500"
          >
            {pending
              ? isSignIn
                ? "Signing in…"
                : "Creating account…"
              : isSignIn
                ? "Sign in"
                : "Create account"}
          </Button>
        </form>

        <div className="mt-6 flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs tracking-wide text-muted-foreground uppercase">
            {isSignIn ? "New to hireloop?" : "Already have an account?"}
          </span>
          <Separator className="flex-1" />
        </div>

        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className={buttonVariants({
            variant: "outline",
            className: "mt-4 h-9 w-full",
          })}
        >
          {isSignIn ? "Create an account" : "Sign in instead"}
        </Link>
      </div>
    </div>
  )
}
