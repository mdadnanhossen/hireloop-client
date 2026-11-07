"use client"

import { AuthForm, type AuthFormValues } from "@/components/auth-form"
import { authClient } from "@/lib/auth-client"

const SignUpPage = () => {
  const handleSignUp = async (data: AuthFormValues) => {
    if (!data.name) {
      throw new Error("Name is required.")
    }

    if (!data.role) {
      throw new Error("Please choose an account type.")
    }

    const { data: signUpResponse, error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
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
