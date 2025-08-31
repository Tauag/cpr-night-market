import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavigationHeader, {
  HEADER_HEIGHT,
} from "@/components/navigation-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Night Market",
  description:
    "Night Market loader for the TTRPG Cyberpunk RED. Not an official product of R. Talstorian Games.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavigationHeader />
          <div
            className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 gap-16 sm:p-20"
            style={{ paddingTop: HEADER_HEIGHT }}
          >
            {children}
            <Toaster position="top-center" richColors />
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
              <p className="text-sm">
                Made with ❤️ by a Cyberpunk RED fan. This is not an official
                product of R. Talstorian Games, please don't sue me bro!
              </p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

// We need to use a client component for ThemeProvider
// This will be added in a separate file, so no need to add here.
// "use client";
