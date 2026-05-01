import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cessa — Software Engineering Student",
  description:
    "Portfolio of Cessa, an Informatics Engineering student at UKSW specializing in Software Engineering. Building web and mobile apps with TypeScript, Go, and more.",
  keywords: [
    "software engineering",
    "portfolio",
    "Next.js",
    "Go",
    "TypeScript",
    "UKSW",
  ],
  openGraph: {
    title: "Cessa — Software Engineering Student",
    description:
      "Portfolio of Cessa — building web and mobile apps with TypeScript, Go, and more.",
    type: "website",
  },
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
