import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="overline text-muted-foreground">404</p>
        <h1 className="mt-3 text-3xl font-semibold uppercase">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Halaman yang Anda cari tidak ada atau sudah dipindahkan.
        </p>
        <div className="mt-6">
          <ButtonLink to="/">Kembali ke beranda</ButtonLink>
        </div>
      </div>
    </div>
  );
}

function ButtonLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-transparent hover:text-foreground"
    >
      {children}
    </Link>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Halaman ini tidak dapat dimuat
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Terjadi kesalahan di sisi kami. Silakan coba lagi atau kembali ke
          beranda.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-transparent hover:text-foreground"
          >
            Coba lagi
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${siteConfig.name} — Layanan Pembuatan Website` },
      { name: "description", content: siteConfig.description },
      { property: "og:title", content: `${siteConfig.name} — Layanan Pembuatan Website` },
      { property: "og:description", content: siteConfig.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen max-w-full flex-col overflow-x-hidden bg-background">
        <Navbar />
        {/* Nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <main className="flex-1 max-w-full overflow-x-hidden">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
