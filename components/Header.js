"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";

const NAV_LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/staff", label: "Staff Directory" },
  { href: "/departments", label: "Departments" },
  { href: "/faculties", label: "Schools" },
  { href: "/announcements", label: "Announcements" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-navy-800 text-white border-b border-navy-900/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <Logo className="h-9 w-9 rounded-md" />
            <span className="leading-tight">
              <span className="block font-display text-base sm:text-lg tracking-tight">
                Staff Directory
              </span>
              <span className="block text-[11px] font-mono uppercase tracking-[0.16em] text-navy-200">
                AIFPU, Unwana
              </span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm transition ${
                    active
                      ? "bg-white/10 text-white font-medium"
                      : "text-navy-100 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <Link href="/staff/new" className="btn-primary bg-royal-600 hover:bg-royal-700">
              + Add Staff
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-white/20"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? (
                <path d="M2 2L16 16M16 2L2 16" strokeLinecap="round" />
              ) : (
                <path d="M2 5H16M2 9H16M2 13H16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-navy-800">
          <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-sm text-navy-100 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/staff/new"
              onClick={() => setOpen(false)}
              className="mt-1 btn-primary bg-royal-600 hover:bg-royal-700 justify-center"
            >
              + Add Staff
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
