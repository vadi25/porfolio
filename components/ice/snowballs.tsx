"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

import { EASE_OUT, easeOut } from "@/components/ice/easing"
import { runPortal } from "@/components/ice/portal"

const FLIGHT_MS = 1000
const SAMPLES = 36
const SPLAT_MS = 140

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function origin() {
  const penguin = document.querySelector(".corner-trigger")
  const rect = penguin?.getBoundingClientRect()
  if (!rect) return null
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height * 0.42 }
}

function pose(startX: number, startY: number, x: number, y: number, amount: number) {
  const t = Math.min(1, Math.max(0, amount))
  const along = easeOut(t)
  const dx = x - startX
  const dy = y - startY
  const distance = Math.hypot(dx, dy)
  const lift = Math.max(108, Math.min(188, distance * 0.36))
  return {
    x: startX + dx * along,
    y: startY + dy * along - Math.sin(Math.PI * t) * lift,
    scale: 0.9 + along * 0.16,
  }
}

function place(element: HTMLElement, x: number, y: number, scaleX: number, scaleY = scaleX) {
  element.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scaleX}, ${scaleY})`
}

function throwSnowball(layer: HTMLElement, x: number, y: number, reduced: boolean) {
  const from = origin()
  const startX = from?.x ?? x
  const startY = from?.y ?? y

  while (layer.childElementCount > 8) layer.firstElementChild?.remove()

  const flight = document.createElement("span")
  flight.className = "throw"
  const shadow = document.createElement("i")
  shadow.className = "snow-shadow"
  const ball = document.createElement("i")
  ball.className = "snowball"
  const sparks = [0.08, 0.15, 0.23].map((lag) => {
    const spark = document.createElement("i")
    spark.className = "snow-spark"
    spark.dataset.lag = String(lag)
    return spark
  })
  flight.append(shadow, ...sparks, ball)
  layer.appendChild(flight)

  const ground = window.innerHeight - Math.min(64, window.innerHeight * 0.07)
  const page = document.querySelector(".ice-page")

  const finish = () => {
    for (const spark of sparks) spark.remove()
    shadow.remove()
    ball.className = "snow-splat"
    place(ball, x, y, 1.22, 0.66)
    page?.classList.remove("is-throwing")
    window.setTimeout(() => flight.remove(), reduced ? 480 : 720)
  }

  if (reduced) {
    finish()
    return wait(20)
  }

  page?.classList.add("is-throwing")
  const penguin = document.querySelector(".penguin:not(.y2k-trigger)")
  penguin?.classList.add("is-winding")
  window.setTimeout(() => penguin?.classList.remove("is-winding"), 180)

  const frames = Array.from({ length: SAMPLES + 1 }, (_, index) => index / SAMPLES)
  const ballFrames: Keyframe[] = frames.map((t) => {
    const point = pose(startX, startY, x, y, t)
    return {
      transform: `translate(${point.x}px, ${point.y}px) translate(-50%, -50%) scale(${point.scale})`,
    }
  })
  const shadowFrames: Keyframe[] = frames.map((t) => {
    const point = pose(startX, startY, x, y, t)
    const height = Math.max(0, ground - point.y)
    const spread = Math.max(0.42, 1 - height / 460)
    return {
      transform: `translate(${point.x}px, ${ground}px) translate(-50%, -50%) scale(${spread}, ${spread * 0.42})`,
      opacity: 0.55 + spread * 0.35,
    }
  })

  const ballAnimation = ball.animate(ballFrames, { duration: FLIGHT_MS, easing: "linear", fill: "forwards" })
  const shadowAnimation = shadow.animate(shadowFrames, { duration: FLIGHT_MS, easing: "linear", fill: "forwards" })
  const sparkAnimations = sparks.map((spark) => {
    const lag = Number(spark.dataset.lag)
    const sparkFrames: Keyframe[] = frames.map((t) => {
      const point = pose(startX, startY, x, y, t - lag)
      const visible = t > lag && t < 0.96
      return {
        transform: `translate(${point.x}px, ${point.y}px) translate(-50%, -50%) scale(${0.55 + point.scale * 0.2})`,
        opacity: visible ? 0.9 - lag * 2 : 0,
      }
    })
    return spark.animate(sparkFrames, { duration: FLIGHT_MS, easing: "linear", fill: "forwards" })
  })

  return Promise.all([
    ballAnimation.finished,
    shadowAnimation.finished,
    ...sparkAnimations.map((item) => item.finished),
  ])
    .then(async () => {
      const landed = pose(startX, startY, x, y, 1)
      place(ball, landed.x, landed.y, landed.scale)
      ballAnimation.cancel()
      shadowAnimation.cancel()
      for (const animation of sparkAnimations) animation.cancel()
      for (const spark of sparks) spark.remove()
      shadow.remove()
      ball.className = "snow-splat"
      const squash = ball.animate(
        [
          { transform: `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${landed.scale})` },
          { transform: `translate(${x}px, ${y}px) translate(-50%, -50%) scale(1.22, 0.66)` },
        ],
        { duration: SPLAT_MS, easing: EASE_OUT, fill: "forwards" },
      )
      await squash.finished
      squash.cancel()
      place(ball, x, y, 1.22, 0.66)
      page?.classList.remove("is-throwing")
      window.setTimeout(() => flight.remove(), 720)
    })
    .catch(() => {
      finish()
    })
}

function landingPoint(event: MouseEvent, anchor: HTMLAnchorElement) {
  if (event.detail === 0) {
    const rect = anchor.getBoundingClientRect()
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
  }
  return { x: event.clientX, y: event.clientY }
}

function isPlainActivation(event: MouseEvent) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.altKey && !event.shiftKey
}

async function go(anchor: HTMLAnchorElement, popup: Window | null, push: (href: string) => void) {
  if (anchor.hasAttribute("data-portal")) {
    if (popup && !popup.closed) popup.close()
    await runPortal(anchor)
    return
  }

  const url = new URL(anchor.href, window.location.href)
  if (url.protocol === "mailto:") {
    window.location.href = anchor.href
    return
  }

  if (popup && !popup.closed) {
    popup.location.href = anchor.href
    return
  }

  if (url.origin !== window.location.origin || anchor.target === "_blank") {
    window.location.href = anchor.href
    return
  }

  const next = `${url.pathname}${url.search}${url.hash}`
  const here = `${window.location.pathname}${window.location.search}${window.location.hash}`
  if (next !== here) push(next)
}

export function Snowballs() {
  const layerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return
    const field = layer
    field.dataset.ready = "true"

    let busy = false

    async function onClick(event: MouseEvent) {
      if (!isPlainActivation(event)) return
      const target = event.target
      if (!(target instanceof Element)) return
      const selection = window.getSelection()
      if (selection && !selection.isCollapsed && selection.toString().length > 0) return

      const anchor = target.closest("a")
      if (!(anchor instanceof HTMLAnchorElement) || !anchor.href || anchor.hasAttribute("download")) {
        if (busy || target.closest("[data-quiet-click]")) return
        void throwSnowball(field, event.clientX, event.clientY, prefersReducedMotion())
        return
      }

      if (anchor.classList.contains("skip-link")) return
      const url = new URL(anchor.href, window.location.href)
      const inPage =
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        url.hash.length > 0 &&
        !anchor.hasAttribute("data-portal")
      if (inPage) return

      event.preventDefault()
      event.stopPropagation()
      if (busy) return

      const external =
        (url.protocol === "http:" || url.protocol === "https:") &&
        (url.origin !== window.location.origin || anchor.target === "_blank")
      const popup = external ? window.open("about:blank", "_blank") : null
      if (popup) popup.opener = null

      busy = true
      try {
        const point = landingPoint(event, anchor)
        await throwSnowball(field, point.x, point.y, prefersReducedMotion())
        await go(anchor, popup, (href) => router.push(href))
      } catch {
        if (popup && !popup.closed) popup.location.href = anchor.href
        else window.location.href = anchor.href
      } finally {
        busy = false
      }
    }

    document.addEventListener("click", onClick, true)
    return () => {
      delete field.dataset.ready
      document.removeEventListener("click", onClick, true)
    }
  }, [router])

  return <div ref={layerRef} className="snowball-layer" aria-hidden="true" />
}
