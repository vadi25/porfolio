"use client"

import { useEffect, useRef } from "react"

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function throwSnowball(layer: HTMLElement, x: number, y: number, reduced: boolean) {
  const penguin = document.querySelector(".corner-trigger")
  const rect = penguin?.getBoundingClientRect()
  const startX = rect ? rect.left + rect.width / 2 : x
  const startY = rect ? rect.top + rect.height * 0.42 : y

  while (layer.childElementCount > 10) layer.firstElementChild?.remove()

  const ball = document.createElement("span")
  ball.className = "snowball"
  layer.appendChild(ball)

  const placeSplat = () => {
    ball.className = "snow-splat"
    ball.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(1.2, 0.7)`
    const hold = reduced ? 480 : 700
    window.setTimeout(() => {
      if (!reduced) ball.style.transition = "opacity 220ms linear"
      ball.style.opacity = "0"
    }, hold)
    window.setTimeout(() => ball.remove(), hold + (reduced ? 40 : 260))
  }

  if (reduced) {
    placeSplat()
    return
  }

  const dx = x - startX
  const dy = y - startY
  const distance = Math.hypot(dx, dy)
  const duration = Math.min(520, Math.max(260, distance * 0.48))
  const lift = Math.min(150, distance * 0.28)
  const started = performance.now()

  const frame = (now: number) => {
    const t = Math.min(1, (now - started) / duration)
    const eased = 1 - (1 - t) ** 2
    const arc = Math.sin(Math.PI * eased) * -lift
    const px = startX + dx * eased
    const py = startY + dy * eased + arc
    const scale = 0.65 + eased * 0.4
    ball.style.transform = `translate(${px}px, ${py}px) translate(-50%, -50%) scale(${scale})`
    if (t < 1) requestAnimationFrame(frame)
    else placeSplat()
  }

  requestAnimationFrame(frame)
}

export function Snowballs() {
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const layer = layerRef.current
    if (!layer) return

    function onClick(event: MouseEvent) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return
      const target = event.target
      if (!(target instanceof Element) || !layer) return
      if (target.closest("[data-portal]")) return
      const selection = window.getSelection()
      if (selection && !selection.isCollapsed && selection.toString().length > 0) return
      throwSnowball(layer, event.clientX, event.clientY, prefersReducedMotion())
    }

    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  return <div ref={layerRef} className="snowball-layer" aria-hidden="true" />
}
