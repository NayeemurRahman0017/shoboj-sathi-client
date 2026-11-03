"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
ArrowLeft,
Camera,
Loader2,
Mail,
Save,
ShieldCheck,
User,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const inputClass =
"w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pl-12 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 dark:border-white/15 dark:bg-[#101b16] dark:text-white dark:placeholder:text-gray-500";

export default function ProfilePage() {
const router = useRouter();
const { data: session, isPending } = authClient.useSession();

const user = session?.user;

const [name, setName] = useState<string | null>(null);
const [photoURL, setPhotoURL] = useState<string | null>(null);
const [saving, setSaving] = useState(false);

const displayName = name ?? user?.name ?? "";
const displayPhoto = photoURL ?? user?.image ?? "";

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
e.preventDefault();

if (saving) return;

if (!displayName.trim()) {
  toast.error("Please enter your name.");
  return;
}

if (displayPhoto.trim()) {
  try {
    const url = new URL(displayPhoto.trim());

    if (!["http:", "https:"].includes(url.protocol)) {
      toast.error("Please enter a valid photo URL.");
      return;
    }
  } catch {
    toast.error("Please enter a valid photo URL.");
    return;
  }
}

setSaving(true);

try {
  const { error } = await authClient.updateUser({
    name: displayName.trim(),
    image: displayPhoto.trim() || undefined,
  });

  if (error) {
    toast.error(error.message || "Unable to update your profile.");
    return;
  }

  toast.success("Profile updated successfully!");
  router.refresh();
} catch {
  toast.error("Something went wrong. Please try again.");
} finally {
  setSaving(false);
}


}

if (isPending) {
return ( <main className="min-h-screen bg-[#faf9f5] px-4 py-12 dark:bg-[#101b16]"> <div className="mx-auto h-96 max-w-2xl animate-pulse rounded-3xl bg-gray-200 dark:bg-white/10" /> </main>
);
}

if (!user) {
return ( <main className="flex min-h-[60vh] items-center justify-center bg-[#faf9f5] px-4 py-16 dark:bg-[#101b16]"> <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center dark:border-white/10 dark:bg-[#17251d]"> <User size={42} className="mx-auto text-emerald-600" /> <h1 className="mt-4 text-xl font-bold text-[#174d36] dark:text-emerald-300">
Please Log In </h1> <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
You need to be logged in to view your profile. </p> <Link
         href="/login"
         className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#174d36] px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-600"
       >
Login </Link> </div> </main>
);
}

return ( <main className="min-h-screen bg-[#faf9f5] px-4 py-10 sm:px-6 lg:py-14 dark:bg-[#101b16]"> <div className="container mx-auto px-4"> <div className="mx-auto max-w-2xl"> <Link
         href="/"
         className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-700 dark:text-gray-400 dark:hover:text-emerald-400"
       > <ArrowLeft size={17} />
Back to Home </Link>

```
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
          <ShieldCheck size={16} />
          My Account
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-[#174d36] sm:text-4xl dark:text-emerald-300">
          Profile Settings
        </h1>

        <p className="mt-3 text-sm leading-7 text-gray-500 sm:text-base dark:text-gray-400">
          Update your display name and profile picture.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm dark:border-white/10 dark:bg-[#17251d]">
        <div className="flex flex-col items-center gap-4 bg-[#174d36] px-6 py-9 text-white sm:flex-row sm:items-end dark:bg-emerald-800">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                displayPhoto.trim() ||
                "/images/gallery/Volunteer%20Team.png"
              }
              alt={displayName || "Profile"}
              className="h-24 w-24 rounded-full border-4 border-white/70 object-cover"
            />

            <span className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-white text-emerald-700 shadow-lg">
              <Camera size={16} />
            </span>
          </div>

          <div className="sm:pb-2">
            <p className="text-xl font-bold">
              {displayName || "My Account"}
            </p>
            <p className="text-sm text-emerald-100">{user.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-9">
          <div>
            <label
              htmlFor="name"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              <User size={17} className="text-emerald-700 dark:text-emerald-400" />
              Display Name
            </label>

            <div className="relative">
              <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="name"
                type="text"
                value={displayName}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className={inputClass}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="photoURL"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              <Camera size={17} className="text-emerald-700 dark:text-emerald-400" />
              Photo URL
            </label>

            <div className="relative">
              <Camera className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="photoURL"
                type="url"
                value={displayPhoto}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className={inputClass}
              />
            </div>

            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
              Paste a publicly accessible image link.
            </p>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              <Mail size={17} className="text-emerald-700 dark:text-emerald-400" />
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="email"
                value={user.email}
                readOnly
                disabled
                className={`${inputClass} cursor-not-allowed opacity-70`}
              />
            </div>

            <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
              Your email cannot be changed.
            </p>
          </div>

          <div className="border-t border-gray-100 pt-6 dark:border-white/10">
            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#174d36] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-48 dark:bg-emerald-700 dark:hover:bg-emerald-600"
            >
              {saving ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <Save size={17} />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</main>


);
}
