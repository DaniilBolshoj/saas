import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkOps - AI nuorodų hub'as",
  description: "Išmanus komandos išteklių valdymas",
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