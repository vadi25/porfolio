import { Comic_Neue } from "next/font/google"

import { CrazyFileClient } from "@/components/portfolio/crazy-file-client"

const comic = Comic_Neue({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
  variable: "--font-crazy",
  fallback: ["Comic Sans MS", "Comic Sans", "cursive"],
})

export function CrazyFile() {
  return <CrazyFileClient fontVariable={comic.variable} />
}
