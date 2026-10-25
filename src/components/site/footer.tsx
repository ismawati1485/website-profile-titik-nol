import { Link } from "@tanstack/react-router";

import { navItems, siteConfig } from "@/config/site";
import { isWhatsAppConfigured } from "@/config/site";

export function Footer() {
  const whatsappReady = isWhatsAppConfigured();

  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em]">
            {siteConfig.name}
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            {siteConfig.positioning}
          </p>
        </div>

        <nav aria-label="Navigasi footer">
          <p className="overline text-muted-foreground">Navigasi</p>
          <ul className="mt-3 space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  hash={"hash" in item ? item.hash : undefined}
                  className="text-sm text-foreground transition-colors hover:underline underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/portfolio"
                className="text-sm text-foreground transition-colors hover:underline underline-offset-4"
              >
                Portfolio
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="overline text-muted-foreground">Kontak</p>
          {whatsappReady ? (
            <p className="mt-3 text-sm">
              WhatsApp:{" "}
              <span className="font-medium">
                +{siteConfig.contact.whatsappNumber.replace(/[^0-9]/g, "")}
              </span>
            </p>
          ) : null}
          {siteConfig.contact.socials.length > 0 ? (
            <ul className="mt-3 space-y-2">
              {siteConfig.contact.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm underline-offset-4 hover:underline"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Kisaran harga di situs ini bersifat indikatif, bukan penawaran
            final.
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-2 px-6 py-5 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Semua hal berawal
            dari nol.
          </p>
          <p className="uppercase tracking-[0.2em]">{siteConfig.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
