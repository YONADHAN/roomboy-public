import type { Metadata } from "next";
import "./globals.css";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ClientShell } from '@/components/layout/ClientShell';
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Roomboy",
  description: "Find your perfect room",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-white text-neutral-900 font-sans antialiased dark:bg-neutral-950 dark:text-neutral-50">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientShell>
            <Header />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </ClientShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
