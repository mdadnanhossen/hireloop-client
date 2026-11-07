"use client"

import { AuthForm } from "@/components/auth-form"
import { signIn } from "@/lib/auth-client"

const SignInPage = () => {
  const handleSubmit = async (data: { email: string; password: string }) => {
    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
    })

    if (error) {
      throw new Error(error.message ?? "Unable to sign in. Please try again.")
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-5.5rem)] items-center justify-center px-4 py-12">
      <AuthForm mode="sign-in" onSubmit={handleSubmit} />
    </main>
  )
}

export default SignInPage
