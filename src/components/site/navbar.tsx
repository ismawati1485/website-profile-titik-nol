import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { navItems, siteConfig } from "@/config/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (to: string, hash?: string) => {
    if (hash) return pathname === to;
    return pathname === to || (to !== "/" && pathname.startsWith(to));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link to="/" className="text-sm font-semibold uppercase tracking-[0.2em]">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={"hash" in item ? item.hash : undefined}
              className={`text-sm font-medium transition-colors ${
                isActive(item.to, "hash" in item ? item.hash : undefined)
                  ? "text-foreground underline underline-offset-8"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/"
            hash="kontak"
            className="border border-foreground bg-foreground px-4 py-2 text-xs font-medium uppercase tracking-widest text-background transition-colors hover:bg-transparent hover:text-foreground"
          >
            Mulai Proyek
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  hash={"hash" in item ? item.hash : undefined}
                  onClick={() => setOpen(false)}
                  className={`block py-2 text-sm font-medium ${
                    isActive(item.to, "hash" in item ? item.hash : undefined)
                      ? "text-foreground underline underline-offset-8"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/"
                hash="kontak"
                onClick={() => setOpen(false)}
                className="mt-2 block border border-foreground bg-foreground px-4 py-2.5 text-center text-xs font-medium uppercase tracking-widest text-background"
              >
                Mulai Proyek
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
