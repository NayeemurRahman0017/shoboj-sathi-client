
"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Leaf,
  Loader2,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackURL = searchParams.get("callbackURL") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL,
      });

      if (error) {
        setError(error.message || "Invalid email or password.");
        return;
      }

      toast.success("Welcome back! You are logged in.");

      router.push(callbackURL);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    setError("");
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL,
      });

      if (error) {
        setError(error.message || "Social login failed.");
        setSocialLoading("");
      }
    } catch {
      setError("Unable to connect. Please try again.");
      setSocialLoading("");
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#faf9f4] px-4 py-12 dark:bg-[#101b16] sm:py-16">
      <div className="container mx-auto px-4">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-emerald-900/10 bg-white shadow-xl shadow-emerald-950/5 dark:border-white/10 dark:bg-[#17251d] md:grid-cols-2">

        <div className="relative hidden min-h-155 flex-col justify-between overflow-hidden bg-[#174d36] p-10 text-white md:flex">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-40 border-white/5" />
          <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full border-50 border-white/5" />

          <Link href="/" className="relative z-10 flex items-center gap-2 text-2xl font-bold">
            <Leaf className="h-7 w-7" />
            ShobujSathi
          </Link>

          <div className="relative z-10">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-emerald-200">
              Together for a better tomorrow
            </p>

            <h1 className="mb-5 text-4xl font-bold leading-tight">
              Small Actions.
              <br />
              Big Changes.
            </h1>

            <p className="max-w-sm leading-7 text-emerald-100">
              Join hands with your community, participate in meaningful
              events, and make a positive difference in people&apos;s lives.
            </p>
          </div>

          <p className="relative z-10 text-sm text-emerald-200">
            Together, We Make a Difference.
          </p>
        </div>

        <div className="flex items-center justify-center px-6 py-10 sm:px-10 md:px-12">
          <div className="w-full max-w-md">

            <Link
              href="/"
              className="mb-8 flex items-center justify-center gap-2 text-xl font-bold text-[#174d36] dark:text-emerald-400 md:hidden"
            >
              <Leaf className="h-6 w-6" />
              ShobujSathi
            </Link>

            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                Welcome Back
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Sign in to your account
              </h2>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Continue making a difference with your community.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin("google")}
                disabled={!!socialLoading || loading}
                className="flex h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60 dark:border-white/15 dark:text-gray-200 dark:hover:bg-white/5"
              >
                {socialLoading === "google" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <svg viewBox="0 0 48 48" className="h-5 w-5">
                    <path fill="#FFC107" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11c-.5 2.5-1.9 4.6-4 6v5h6.5c3.8-3.5 6.1-8.6 6.1-14.7Z" />
                    <path fill="#34A853" d="M24 44c5.4 0 9.9-1.8 13.2-4.8l-6.5-5c-1.8 1.2-4 1.9-6.7 1.9-5.2 0-9.6-3.5-11.2-8.2H6.1v5.1C9.4 39.5 16.1 44 24 44Z" />
                    <path fill="#4A90E2" d="M12.8 27.9a12 12 0 0 1 0-7.8V15H6.1a20 20 0 0 0 0 18Z" />
                    <path fill="#EA4335" d="M24 11.9c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6 29.4 4 24 4 16.1 4 9.4 8.5 6.1 15l6.7 5.1c1.6-4.7 6-8.2 11.2-8.2Z" />
                  </svg>
                )}
                Google
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin("github")}
                disabled={!!socialLoading || loading}
                className="flex h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60 dark:border-white/15 dark:text-gray-200 dark:hover:bg-white/5"
              >
                {socialLoading === "github" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <FaGithub className="h-5 w-5" />
                )}
                GitHub
              </button>
            </div>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
              <span className="text-xs font-medium text-gray-400">
                OR CONTINUE WITH EMAIL
              </span>
              <div className="h-px flex-1 bg-gray-200 dark:bg-white/10" />
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 dark:border-white/15 dark:bg-[#101b16] dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 dark:border-white/15 dark:bg-[#101b16] dark:text-white"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !!socialLoading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#174d36] text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-[#103c29] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-700 dark:hover:bg-emerald-600"
              >
                {loading && <Loader2 className="h-5 w-5 animate-spin" />}
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="mt-7 text-center text-sm text-gray-500 dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-emerald-700 hover:underline dark:text-emerald-400"
              >
                Create Account
              </Link>
            </p>

          </div>
        </div>
      </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}