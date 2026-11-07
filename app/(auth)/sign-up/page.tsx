"use client"

import { AuthForm } from "@/components/auth-form"
import { authClient } from "@/lib/auth-client"

const SignUpPage = () => {
  const handleSignUp = async (data: {
    name?: string
    email: string
    password: string
  }) => {
    if (!data.name) {
      throw new Error("Name is required.")
    }

    const { data: signUpResponse, error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    })

    if (error) {
      throw new Error(error.message ?? "Unable to create the account.")
    }

    console.log("Signup successful:", signUpResponse)
  }

  return (
    <main className="flex min-h-[calc(100vh-5.5rem)] items-center justify-center px-4 py-12">
      <AuthForm mode="sign-up" onSubmit={handleSignUp} />
    </main>
  )
}

export default SignUpPage
