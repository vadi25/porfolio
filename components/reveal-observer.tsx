"use client"

import { useEffect } from "react"

const REVEAL_SELECTOR = "[data-reveal]"

export function RevealObserver() {
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!("IntersectionObserver" in window)) return

    const observedElements = new Set<HTMLElement>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const target = entry.target as HTMLElement
          target.dataset.revealed = "true"
          observer.unobserve(target)
          observedElements.delete(target)
        })
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.2,
      }
    )

    const observeRevealElements = () => {
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((element) => {
        if (observedElements.has(element) || element.dataset.revealed === "true") {
          return
        }

        observedElements.add(element)
        observer.observe(element)
      })
    }

    const mutationObserver = new MutationObserver(observeRevealElements)

    observeRevealElements()
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
    }
  }, [])

  return null
}
