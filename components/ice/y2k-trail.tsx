"use client"

import { useEffect } from "react"

export function Y2kTrail() {
  useEffect(() => {
    const stage = document.querySelector(".y2k-page")
    if (!(stage instanceof HTMLElement)) return

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const fine = window.matchMedia("(pointer: fine)")
    if (motion.matches || !fine.matches) return

    const layer = document.createElement("div")
    layer.className = "y2k-trail"
    layer.setAttribute("data-y2k-trail", "")
    layer.setAttribute("aria-hidden", "true")
    const sparks = Array.from({ length: 8 }, (_, index) => {
      const spark = document.createElement("span")
      spark.textContent = index % 2 === 0 ? "★" : "✦"
      spark.style.opacity = String(1 - index * 0.1)
      layer.append(spark)
      return spark
    })
    document.body.append(layer)

    const points = sparks.map(() => ({ x: -80, y: -80 }))
    let pointerX = -80
    let pointerY = -80
    let frame = 0
    let running = false

    const draw = () => {
      points.forEach((point, index) => {
        const previous = index === 0 ? { x: pointerX, y: pointerY } : points[index - 1]
        const ease = index === 0 ? 1 : 0.38
        point.x += (previous.x - point.x) * ease
        point.y += (previous.y - point.y) * ease
        const spark = sparks[index]
        if (spark) spark.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`
      })
      if (running) frame = window.requestAnimationFrame(draw)
    }

    const stop = () => {
      running = false
      window.cancelAnimationFrame(frame)
      layer.style.opacity = "0"
    }

    const onMove = (event: PointerEvent) => {
      if (motion.matches) return
      pointerX = event.clientX
      pointerY = event.clientY
      layer.style.opacity = "1"
      if (running || document.hidden) return
      running = true
      frame = window.requestAnimationFrame(draw)
    }

    const onVisibility = () => {
      if (document.hidden) stop()
    }

    const onMotion = () => {
      if (motion.matches) {
        stop()
        layer.remove()
      }
    }

    stage.addEventListener("pointermove", onMove, { passive: true })
    stage.addEventListener("pointerleave", stop)
    document.addEventListener("visibilitychange", onVisibility)
    motion.addEventListener("change", onMotion)

    return () => {
      stop()
      stage.removeEventListener("pointermove", onMove)
      stage.removeEventListener("pointerleave", stop)
      document.removeEventListener("visibilitychange", onVisibility)
      motion.removeEventListener("change", onMotion)
      layer.remove()
    }
  }, [])

  return null
}
