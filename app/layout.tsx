import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkOps | Freelancerio darbo erdvė",
  description: "Klientų projektų vertinimas ir išteklių valdymas freelancerio darbo erdvėje.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lt">
      <body className="antialiased bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}