import type { CSSProperties, ReactNode } from "react"

import { cn } from "@/lib/utils"

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
}

type RevealStyle = CSSProperties & {
  "--reveal-delay": string
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const style: RevealStyle = {
    "--reveal-delay": `${delay}ms`,
  }

  return (
    <div data-reveal className={cn("reveal", className)} style={style}>
      {children}
    </div>
  )
}
