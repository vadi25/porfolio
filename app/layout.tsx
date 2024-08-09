import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils"
import { DM_Sans } from 'next/font/google'
import { Space_Mono } from 'next/font/google'

const fontHeading = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Space_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  weight: '400'
})

export const metadata: Metadata = {
  title: "JV Porfolio",
  description: "Personal portfolio of Javier Vadillo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}>{children}</body>
    </html>
  );
}
