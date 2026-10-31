"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
Menu,
X,
Leaf,
ChevronDown,
PlusCircle,
CalendarDays,
Users,
LogOut,
} from "lucide-react";
import { FaUserCircle } from "react-icons/fa";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import ThemeToggle from "@/components/shared/theme-toggle";

const navLinks = [
{ name: "Home", href: "/" },
{ name: "Upcoming Events", href: "/events" },
];

const dashboardLinks = [
{
name: "Create Event",
href: "/create-event",
icon: PlusCircle,
},
{
name: "Manage Events",
href: "/manage-events",
icon: CalendarDays,
},
{
name: "Joined Events",
href: "/joined-events",
icon: Users,
},
];

export default function Navbar() {
const pathname = usePathname();
const router = useRouter();
const profileRef = useRef<HTMLDivElement>(null);

const { data: session, isPending } = authClient.useSession();

const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [profileMenuOpen, setProfileMenuOpen] = useState(false);

const user = session?.user;

// Close profile dropdown when clicking outside
useEffect(() => {
function handleClickOutside(event: MouseEvent) {
if (
profileRef.current &&
!profileRef.current.contains(event.target as Node)
) {
setProfileMenuOpen(false);
}
}


document.addEventListener("mousedown", handleClickOutside);

return () => {
  document.removeEventListener("mousedown", handleClickOutside);
};


}, []);

async function handleLogout() {
try {
await authClient.signOut();

  closeMenus();

  toast.success("Logged out successfully!");

  router.push("/");
  router.refresh();
} catch {
  toast.error("Unable to log out. Please try again.");
}


}

function closeMenus() {
setProfileMenuOpen(false);
setMobileMenuOpen(false);
}

function isActiveRoute(href: string) {
return (
pathname === href ||
(href !== "/" && pathname.startsWith(href))
);
}

return ( <header className="sticky top-0 z-50 border-b border-emerald-100 bg-[#faf9f5]/95 backdrop-blur-md"> <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
{/* Logo */} <Link
       href="/"
       onClick={closeMenus}
       className="flex items-center gap-2"
     > <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#174d36] text-white"> <Leaf size={23} /> </div>


      <div>
        <span className="text-xl font-bold tracking-tight text-[#174d36]">
          ShobujShathi
        </span>

        <p className="text-[10px] font-medium tracking-wider text-gray-500">
          TOGETHER, WE MAKE A DIFFERENCE
        </p>
      </div>
    </Link>

    {/* Desktop Navigation */}
    <div className="hidden items-center gap-8 md:flex">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-sm font-semibold transition ${
            isActiveRoute(link.href)
              ? "text-emerald-800"
              : "text-gray-600 hover:text-emerald-700"
          }`}
        >
          {link.name}
        </Link>
      ))}
    </div>

    {/* Desktop Actions */}
    <div className="hidden items-center gap-4 md:flex">
      <ThemeToggle />

      {!isPending && !user && (
        <Link
          href="/login"
          className="rounded-xl bg-[#174d36] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
        >
          Login
        </Link>
      )}

      {!isPending && user && (
        <div ref={profileRef} className="relative">
          <button
            type="button"
            onClick={() =>
              setProfileMenuOpen((previous) => !previous)
            }
            onMouseEnter={() => setProfileMenuOpen(true)}
            aria-expanded={profileMenuOpen}
            aria-haspopup="menu"
            aria-label="Open profile menu"
            className="flex items-center gap-2 rounded-full border border-emerald-100 bg-white py-1.5 pl-1.5 pr-3 transition hover:bg-emerald-50"
          >
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "Profile"}
                width={36}
                height={36}
                unoptimized
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="h-9 w-9 text-emerald-700" />
            )}

            <span className="max-w-28 truncate text-sm font-semibold text-[#174d36]">
              {user.name || "My Account"}
            </span>

            <ChevronDown
              size={16}
              className={`text-gray-500 transition ${
                profileMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileMenuOpen && (
            <div
              onMouseLeave={() => setProfileMenuOpen(false)}
              className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white py-3 shadow-xl"
            >
              <div className="border-b border-gray-100 px-4 pb-3">
                <p className="truncate text-sm font-bold text-[#174d36]">
                  {user.name || "My Account"}
                </p>

                <p className="truncate text-xs text-gray-500">
                  {user.email}
                </p>
              </div>

              <div className="py-2">
                {dashboardLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenus}
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition ${
                        isActiveRoute(link.href)
                          ? "bg-emerald-50 text-emerald-800"
                          : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-800"
                      }`}
                    >
                      <Icon size={18} />
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="border-t border-gray-100 pt-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>

    {/* Mobile Actions */}
    <div className="flex items-center gap-3 md:hidden">
      <ThemeToggle />

      <button
        type="button"
        onClick={() =>
          setMobileMenuOpen((previous) => !previous)
        }
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
        className="rounded-lg p-2 text-[#174d36] transition hover:bg-emerald-50"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  </nav>

  {/* Mobile Menu */}
  {mobileMenuOpen && (
    <div className="border-t border-emerald-100 bg-[#faf9f5] px-5 py-5 shadow-lg md:hidden">
      <div className="flex flex-col gap-2">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={closeMenus}
            className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
              isActiveRoute(link.href)
                ? "bg-emerald-100 text-emerald-800"
                : "text-gray-600 hover:bg-emerald-50"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="mt-4 border-t border-emerald-100 pt-4">
        {!isPending && !user && (
          <Link
            href="/login"
            onClick={closeMenus}
            className="block rounded-xl bg-[#174d36] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Login
          </Link>
        )}

        {!isPending && user && (
          <>
            {/* User Information */}
            <div className="mb-4 flex items-center gap-3 rounded-xl bg-emerald-50 p-3">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "Profile"}
                  width={42}
                  height={42}
                  unoptimized
                  className="h-11 w-11 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="h-11 w-11 text-emerald-700" />
              )}

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#174d36]">
                  {user.name || "My Account"}
                </p>

                <p className="truncate text-xs text-gray-500">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Dashboard Links */}
            <div className="space-y-1">
              {dashboardLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenus}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActiveRoute(link.href)
                        ? "bg-emerald-100 text-emerald-800"
                        : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-800"
                    }`}
                  >
                    <Icon size={18} />
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  )}
</header>

);
}
