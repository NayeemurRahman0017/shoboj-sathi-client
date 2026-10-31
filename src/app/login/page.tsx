
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Leaf,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8faf5] px-5 py-12 dark:bg-background">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm sm:p-10 dark:border-border dark:bg-card">

          {/* Logo */}
          <Link
            href="/"
            className="mb-8 flex items-center justify-center gap-2"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Leaf size={25} />
            </div>

            <span className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              ShobujShathi
            </span>
          </Link>

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-foreground">
              Welcome Back!
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-muted-foreground">
              Sign in to continue making a difference.
            </p>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            {/* Google */}
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-border dark:text-foreground dark:hover:bg-muted"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.05 5.05 0 0 1-2.2 3.31v2.77h3.57c2.09-1.92 3.27-4.74 3.27-8.09Z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.1V7.06H2.18A11 11 0 0 0 1 12c0 1.78.43 3.46 1.18 4.94l3.66-2.84Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.37c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.06L5.84 9.9C6.71 7.3 9.14 5.37 12 5.37Z"
                />
              </svg>

              Continue with Google
            </button>

            {/* GitHub */}
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-border dark:text-foreground dark:hover:bg-muted"
            >
              <FaGithub size={20} />
              Continue with GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200 dark:bg-border" />

            <span className="text-xs text-gray-400">
              OR CONTINUE WITH EMAIL
            </span>

            <div className="h-px flex-1 bg-gray-200 dark:bg-border" />
          </div>

          {/* Login Form */}
          <form className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700 dark:text-foreground"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-transparent py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-border"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700 dark:text-foreground"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-emerald-700 hover:underline dark:text-emerald-400"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-transparent py-3.5 pl-12 pr-12 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 dark:border-border"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="button"
              className="w-full rounded-xl bg-emerald-700 py-3.5 font-semibold text-white transition hover:bg-emerald-800"
            >
              Sign In
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-7 text-center text-sm text-gray-500 dark:text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-emerald-700 hover:underline dark:text-emerald-400"
            >
              Create Account
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Together, We Make a Difference.
        </p>
      </div>
    </main>
  );
}

