import { Comic_Neue } from "next/font/google"

const comic = Comic_Neue({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-comic",
})

export default function Y2KLayout({ children }: { children: React.ReactNode }) {
  return <div className={comic.variable}>{children}</div>
}
