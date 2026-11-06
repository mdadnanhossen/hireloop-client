"use client"

import Image from "next/image"
import Link from "next/link"
import { MenuIcon } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import logo from "@/app/images/logo.png"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

function Logo() {
  return (
    <Link
      href="/"
      aria-label="hireloop home"
      className="flex shrink-0 items-center"
    >
      <Image
        src={logo}
        alt="hireloop"
        width={154}
        height={44}
        priority
        className="h-7 w-auto"
      />
    </Link>
  )
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-background/70 px-4 py-4 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="flex h-14 items-center justify-between gap-4 rounded-2xl border border-border bg-card px-4 sm:px-5"
      >
        <Logo />

        {/* Desktop navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/90 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Separator orientation="vertical" className="h-5 self-center" />
          <Link
            href="/sign-in"
            className="text-sm font-medium text-indigo-500 transition-colors hover:text-indigo-400"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className={buttonVariants({
              className:
                "h-9 bg-indigo-600 px-4 text-white hover:bg-indigo-500",
            })}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile navigation */}
        <Sheet>
          <SheetTrigger
            aria-label="Open menu"
            render={
              <Button
                variant="ghost"
                size="icon"
                className="size-9 text-foreground hover:bg-muted md:hidden"
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>
          <SheetContent side="right" className="w-80 gap-0">
            <SheetHeader className="border-b border-border">
              <SheetTitle>
                <Image
                  src={logo}
                  alt="hireloop"
                  width={154}
                  height={44}
                  className="h-7 w-auto"
                />
              </SheetTitle>
              <SheetDescription className="sr-only">
                Navigation menu
              </SheetDescription>
            </SheetHeader>

            <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <SheetClose
                  key={link.href}
                  nativeButton={false}
                  render={
                    <Link
                      href={link.href}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/90 transition-colors hover:bg-muted hover:text-foreground"
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>

            <SheetFooter className="border-t border-border">
              <SheetClose
                nativeButton={false}
                render={
                  <Link
                    href="/sign-in"
                    className={buttonVariants({
                      variant: "outline",
                      className: "h-9 w-full",
                    })}
                  />
                }
              >
                Sign In
              </SheetClose>
              <SheetClose
                nativeButton={false}
                render={
                  <Link
                    href="/sign-up"
                    className={buttonVariants({
                      className:
                        "h-9 w-full bg-indigo-600 text-white hover:bg-indigo-500",
                    })}
                  />
                }
              >
                Get Started
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
