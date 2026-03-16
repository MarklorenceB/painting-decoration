"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

const serviceLinks = [
  {
    href: "/services/interior-painting-decorating",
    label: "Interior Painting & Decorating",
  },
  { href: "/services/exterior-painting", label: "Exterior Painting" },
  { href: "/services/wall-floor-tiling", label: "Wall & Floor Tiling" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const isServicesActive = pathname.startsWith("/services");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between py-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Jason Chapman Logo"
              width={110}
              height={100}
              className="rounded-md"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {/* Services dropdown */}
            <div className="group relative">
              <button
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                  isServicesActive
                    ? "text-primary underline underline-offset-4"
                    : "hover:text-primary"
                }`}
              >
                Services
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute top-full left-0 pt-2">
                <div className="bg-white rounded-lg shadow-lg border border-slate-200 py-2 min-w-[260px]">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-4 py-2.5 text-sm font-medium transition-colors ${
                        pathname === link.href
                          ? "text-primary bg-primary/5"
                          : "text-slate-700 hover:text-primary hover:bg-slate-50"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/gallery"
              className={`text-sm font-medium transition-colors ${
                pathname === "/gallery"
                  ? "text-primary underline underline-offset-4"
                  : "hover:text-primary"
              }`}
            >
              Gallery
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors ${
                pathname === "/contact"
                  ? "text-primary underline underline-offset-4"
                  : "hover:text-primary"
              }`}
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/contact#contact-form"
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-bold transition-all"
            >
              Get a Quote
            </Link>
            <button
              className="md:hidden text-slate-700"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden pb-4 space-y-1">
            {/* Services with sub-links */}
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className={`flex items-center justify-between w-full py-2 text-sm font-medium ${
                isServicesActive ? "text-primary" : "text-slate-700"
              }`}
            >
              Services
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  mobileServicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 space-y-1">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-2 text-sm font-medium ${
                      pathname === link.href ? "text-primary" : "text-slate-500"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="/gallery"
              onClick={() => setMobileOpen(false)}
              className={`block py-2 text-sm font-medium ${
                pathname === "/gallery" ? "text-primary" : "text-slate-700"
              }`}
            >
              Gallery
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className={`block py-2 text-sm font-medium ${
                pathname === "/contact" ? "text-primary" : "text-slate-700"
              }`}
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
