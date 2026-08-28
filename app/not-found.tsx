import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#f7f4ee] text-foreground">
      <div className="max-w-md">
        <p className="font-mono text-sm text-foreground-subtle mb-3">404</p>
        <h1 className="text-3xl font-semibold tracking-tight mb-3">
          Page not found.
        </h1>
        <p className="text-foreground-muted mb-8 text-sm">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors duration-150 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back home
        </Link>
      </div>
    </main>
  );
}
