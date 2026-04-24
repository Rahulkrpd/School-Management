

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import ToggleDarkWhite from "@/component/ToggleDarkWhite";

import ReduxProvider from "@/store/Provider";

const geistSans = Geist({
  // variable: "--font-geist-sans, --font-roboto",
  variable: "--font-roboto",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  // variable: "--font-geist-mono , --font-roboto",
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "School Management System",
  description: "A comprehensive school management system built with Next.js and Material-UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="min-h-full flex flex-col">
        <ToggleDarkWhite />
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
