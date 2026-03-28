import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FleetScan AI — Smart Inspections. Safer Roads.",
  description:
    "AI-powered DOT trailer inspection assistant. Detect damage, auto-fill forms, and generate compliance labels.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--color-bg)]">
        <nav className="bg-[var(--color-primary)] text-white px-4 py-3 flex items-center justify-between shadow-md">
          <a href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="text-2xl">🔍</span>
            <span>FleetScan AI</span>
          </a>
          <div className="flex gap-4 text-sm">
            <a href="/" className="hover:text-blue-200 transition-colors">
              Home
            </a>
            <a href="/scan" className="hover:text-blue-200 transition-colors">
              New Scan
            </a>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
