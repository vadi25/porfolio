"use client"

import { useEffect } from "react"

const REVEAL_SELECTOR = "[data-reveal]"

export function RevealObserver() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
    )

    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const target = entry.target as HTMLElement
          target.dataset.revealed = "true"
          observer.unobserve(target)
        })
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.2,
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return null
}
