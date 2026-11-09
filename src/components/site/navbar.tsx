import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { navItems, siteConfig } from "@/config/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useRouterState({
    select: (s) => ({
      pathname: s.location.pathname,
      hash: s.location.hash,
    }),
  });

  const isItemActive = (to: string, itemHash?: string) => {
    if (itemHash) {
      return pathname === to && hash === `#${itemHash}`;
    }
    if (to === "/") {
      return pathname === "/" && (!hash || hash === "");
    }
    return pathname.startsWith(to);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#111111]/10 bg-[#F9F9F7]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">
        {/* Logo TITIK NOL */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3 transition-opacity hover:opacity-85"
          aria-label={`${siteConfig.name} Beranda`}
        >
          <img
            src="/logo utama.jpeg"
            alt={siteConfig.name}
            className="h-6 w-auto object-contain sm:h-7 md:h-8"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => {
            const itemHash = "hash" in item ? item.hash : undefined;
            const active = isItemActive(item.to, itemHash);
            return (
              <Link
                key={item.label}
                to={item.to}
                hash={itemHash}
                className={`py-1 text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                  active
                    ? "border-b-2 border-[#111111] font-bold text-[#111111]"
                    : "border-b-2 border-transparent text-[#666666] hover:text-[#111111]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/"
            hash="kontak"
            className="inline-flex items-center gap-2 border border-[#111111] bg-[#111111] px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-transparent hover:text-[#111111]"
          >
            <span>MULAI PROYEK</span>
            <span aria-hidden="true">→</span>
          </Link>
        </nav>

        {/* Mobile menu trigger */}
        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center border border-[#111111]/15 text-[#111111] transition-colors hover:border-[#111111] md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <nav className="border-t border-[#111111]/10 bg-[#F9F9F7] px-6 py-5 md:hidden">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => {
              const itemHash = "hash" in item ? item.hash : undefined;
              const active = isItemActive(item.to, itemHash);
              return (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    hash={itemHash}
                    onClick={() => setOpen(false)}
                    className={`block py-2.5 text-xs font-semibold uppercase tracking-[0.2em] ${
                      active
                        ? "font-bold text-[#111111] underline underline-offset-8 decoration-2"
                        : "text-[#666666] hover:text-[#111111]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-3">
              <Link
                to="/"
                hash="kontak"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 border border-[#111111] bg-[#111111] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-transparent hover:text-[#111111]"
              >
                <span>MULAI PROYEK</span>
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
