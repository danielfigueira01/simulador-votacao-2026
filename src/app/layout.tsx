import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simulador Educativo de Votação 2026",
  description: "Demonstração educativa interativa do processo de votação para Deputado Estadual.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen antialiased bg-slate-950 text-slate-100 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
