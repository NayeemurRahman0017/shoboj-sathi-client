
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Image as ImageIcon,
  Leaf,
  Loader2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const validatePassword = (value: string) => {
    if (value.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter.";
    }

    if (!/[a-z]/.test(value)) {
      return "Password must contain at least one lowercase letter.";
    }

    return "";
  };

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const passwordError = validatePassword(password);

    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: photoURL.trim() || undefined,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Registration failed.");
        return;
      }

      toast.success("Registration successful! Welcome to ShobujSathi.");

      router.push("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-[#faf9f4] px-4 py-10 dark:bg-[#101b16] sm:py-14">
      <div className="container mx-auto px-4">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-emerald-900/10 bg-white shadow-xl shadow-emerald-950/5 dark:border-white/10 dark:bg-[#17251d] md:grid-cols-2">

        <div className="relative hidden min-h-175 flex-col justify-between overflow-hidden bg-[#174d36] p-10 text-white md:flex">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-40 border-white/5" />
          <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full border-50 border-white/5" />

          <Link
            href="/"
            className="relative z-10 flex items-center gap-2 text-2xl font-bold"
          >
            <Leaf className="h-7 w-7" />
            ShobujSathi
          </Link>

          <div className="relative z-10">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-emerald-200">
              Be a Part of the Change
            </p>

            <h1 className="mb-5 text-4xl font-bold leading-tight">
              Join Our
              <br />
              Green Community.
            </h1>

            <p className="max-w-sm leading-7 text-emerald-100">
              Create your account, connect with people, and take part in
              meaningful community service events.
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
              className="mb-7 flex items-center justify-center gap-2 text-xl font-bold text-[#174d36] dark:text-emerald-400 md:hidden"
            >
              <Leaf className="h-6 w-6" />
              ShobujSathi
            </Link>

            <div className="mb-7">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                Get Started
              </p>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Create an Account
              </h2>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Join ShobujSathi and start making a difference.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                >
                  Full Name
                </label>

                <div className="relative">
                  <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <input
                    id="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 dark:border-white/15 dark:bg-[#101b16] dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                >
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
                <label
                  htmlFor="photoURL"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                >
                  Photo URL
                  <span className="ml-1 font-normal text-gray-400">
                    (Optional)
                  </span>
                </label>

                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <input
                    id="photoURL"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    className="h-12 w-full rounded-xl border border-gray-200 bg-white pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10 dark:border-white/15 dark:bg-[#101b16] dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="new-password"
                    placeholder="Create a strong password"
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

                <p className="mt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                  At least 6 characters, including one uppercase and one
                  lowercase letter.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#174d36] text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-[#103c29] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-700 dark:hover:bg-emerald-600"
              >
                {loading && (
                  <Loader2 className="h-5 w-5 animate-spin" />
                )}

                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-emerald-700 hover:underline dark:text-emerald-400"
              >
                Sign In
              </Link>
            </p>

          </div>
        </div>
      </div>
      </div>
    </main>
  );
}