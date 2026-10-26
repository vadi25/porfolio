import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Manrope } from "next/font/google"

import { WorldShell } from "@/components/ice/world-shell"
import { person, siteUrl } from "@/lib/site"

import "./globals.css"
import "./ice.css"

const display = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "600", "700"],
})

const body = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: `${person.name} — ${person.role}`,
  description: person.bio[0],
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
}

export const viewport: Viewport = { themeColor: "#16344e" }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${display.variable} ${body.variable}`}>
        <WorldShell>{children}</WorldShell>
      </body>
    </html>
  )
}
