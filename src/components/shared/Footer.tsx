import Link from "next/link";
import {
FaFacebookF,
FaInstagram,
FaLinkedinIn,
FaGithub,
FaEnvelope,
FaMapMarkerAlt,
FaPhoneAlt,
FaHeart,
} from "react-icons/fa";

const quickLinks = [
{ name: "Home", href: "/" },
{ name: "Upcoming Events", href: "/events" },
{ name: "About Us", href: "/about" },
{ name: "Contact", href: "/contact" },
];

const categories = [
"Education",
"Healthcare",
"Environment",
"Food Support",
"Community Support",
];

const socialLinks = [
{
name: "Facebook",
href: "#",
icon: FaFacebookF,
},
{
name: "Instagram",
href: "#",
icon: FaInstagram,
},
{
name: "LinkedIn",
href: "#",
icon: FaLinkedinIn,
},
{
name: "GitHub",
href: "#",
icon: FaGithub,
},
];

export default function Footer() {
return ( <footer className="bg-emerald-950 px-5 pt-16 text-white sm:px-8 lg:px-16"> <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4">
{/* Brand */} <div> <Link href="/" className="text-2xl font-bold">
Shobuj<span className="text-emerald-400">Shathi</span> </Link>

      <p className="mt-4 max-w-xs text-sm leading-7 text-emerald-100/70">
        Together, We Make a Difference. Join our community and help create
        positive change through meaningful social initiatives.
      </p>

      {/* Social Links */}
      <div className="mt-6 flex gap-3">
        {socialLinks.map((social) => {
          const Icon = social.icon;

          return (
            <a
              key={social.name}
              href={social.href}
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-emerald-600"
            >
              <Icon size={18} />
            </a>
          );
        })}
      </div>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="mb-5 text-lg font-semibold">Quick Links</h3>

      <ul className="space-y-3">
        {quickLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-sm text-emerald-100/70 transition hover:text-emerald-400"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>

    {/* Activities */}
    <div>
      <h3 className="mb-5 text-lg font-semibold">Our Activities</h3>

      <ul className="space-y-3">
        {categories.map((category) => (
          <li key={category} className="text-sm text-emerald-100/70">
            {category}
          </li>
        ))}
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h3 className="mb-5 text-lg font-semibold">Contact Us</h3>

      <ul className="space-y-4 text-sm text-emerald-100/70">
        <li className="flex items-start gap-3">
          <FaMapMarkerAlt className="mt-1 shrink-0 text-emerald-400" />
          <span>Dhaka, Bangladesh</span>
        </li>

        <li className="flex items-center gap-3">
          <FaEnvelope className="shrink-0 text-emerald-400" />
          <a href="mailto:hello@shobujshathi.com">
            hello@shobujshathi.com
          </a>
        </li>

        <li className="flex items-center gap-3">
          <FaPhoneAlt className="shrink-0 text-emerald-400" />
          <span>+880 1XXXXXXXXX</span>
        </li>
      </ul>
    </div>
  </div>

  {/* Copyright */}
  <div className="border-t border-white/10 py-6">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-xs text-emerald-100/60 sm:flex-row sm:text-left">
      <p>
  © 2026 ShobujShathi. All rights reserved.
</p>

      <p className="flex items-center gap-1">
        Made with{" "}
        <FaHeart className="text-emerald-400" />{" "}
        for a better community
      </p>
    </div>
  </div>
</footer>


);
}
