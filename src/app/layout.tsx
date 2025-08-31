import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavigationHeader from "@/components/navigation-header";
import { ThemeProvider } from "@/components/theme-provider";
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavigationHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

// We need to use a client component for ThemeProvider
// This will be added in a separate file, so no need to add here.
// "use client";
