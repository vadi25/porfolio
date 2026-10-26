"use client"

import { useEffect, useRef } from "react"

import sprite from "@/lib/penguin-sprite.json"

type Eye = {
  x: number
  y: number
  w: number
  h: number
  pupilX: number
  pupilY: number
}

function findEyes(rows: readonly string[]): Eye[] {
  const pupils: Array<[number, number]> = []
  rows.forEach((row, y) => {
    ;[...row].forEach((cell, x) => {
      if (cell === "p") pupils.push([x, y])
    })
  })

  return pupils.map(([sx, sy]) => {
    const seen = new Set<string>()
    const stack: Array<[number, number]> = [[sx, sy]]
    let minX = sx
    let maxX = sx
    let minY = sy
    let maxY = sy
    while (stack.length > 0) {
      const next = stack.pop()
      if (!next) break
      const [x, y] = next
      const key = `${x},${y}`
      if (seen.has(key)) continue
      const cell = rows[y]?.[x]
      if (cell !== "e" && cell !== "p") continue
      seen.add(key)
      minX = Math.min(minX, x)
      maxX = Math.max(maxX, x)
      minY = Math.min(minY, y)
      maxY = Math.max(maxY, y)
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
    }
    return { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1, pupilX: sx, pupilY: sy }
  })
}

const eyes = findEyes(sprite.rows)
const palette = sprite.palette as Record<string, string>

type PenguinProps = {
  href: string
  label: string
  variant?: "ice" | "y2k"
}

export function Penguin({ href, label, variant = "ice" }: PenguinProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const pupils = [...root.querySelectorAll<SVGElement>("[data-pupil]")]

    function onPoint(event: PointerEvent) {
      for (const pupil of pupils) {
        const eye = pupil.parentElement?.querySelector("[data-eye-box]")
        if (!(eye instanceof Element)) continue
        const box = eye.getBoundingClientRect()
        const dx = event.clientX - (box.left + box.width / 2)
        const dy = event.clientY - (box.top + box.height / 2)
        const len = Math.hypot(dx, dy)
        const dist = len === 0 ? 0 : Math.min(2.4, len / 26)
        const ux = len === 0 ? 0 : (dx / len) * dist
        const uy = len === 0 ? 0 : (dy / len) * dist
        pupil.style.transform = `translate(${ux}px, ${uy}px)`
      }
    }

    function stop() {
      window.removeEventListener("pointermove", onPoint)
      window.removeEventListener("pointerdown", onPoint)
      for (const pupil of pupils) pupil.style.transform = ""
    }

    function start() {
      window.addEventListener("pointermove", onPoint, { passive: true })
      window.addEventListener("pointerdown", onPoint, { passive: true })
    }

    function sync() {
      stop()
      if (!media.matches) start()
    }

    sync()
    media.addEventListener("change", sync)
    return () => {
      media.removeEventListener("change", sync)
      stop()
    }
  }, [])

  const width = sprite.rows[0]?.length ?? 16
  const height = sprite.rows.length

  return (
    <a
      ref={ref}
      className={variant === "y2k" ? "corner-trigger penguin y2k-trigger" : "corner-trigger penguin"}
      href={href}
      data-portal=""
      aria-label={label}
    >
      <svg className="penguin-art" viewBox={`0 0 ${width} ${height}`} shapeRendering="crispEdges" aria-hidden="true">
        {sprite.rows.flatMap((row, y) =>
          [...row].flatMap((cell, x) => {
            if (cell === "." || cell === "p" || cell === "e" || !palette[cell]) return []
            return <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={palette[cell]} />
          }),
        )}
        {sprite.rows.flatMap((row, y) =>
          [...row].flatMap((cell, x) =>
            cell === "e" ? <rect key={`e-${x}-${y}`} x={x} y={y} width={1} height={1} fill={palette.e} /> : [],
          ),
        )}
        {eyes.map((eye) => (
          <g key={`eye-${eye.pupilX}-${eye.pupilY}`} transform={`translate(${eye.x} ${eye.y})`}>
            <rect data-eye-box="" width={eye.w} height={eye.h} fill="transparent" />
            <rect
              data-pupil=""
              x={eye.pupilX - eye.x}
              y={eye.pupilY - eye.y}
              width={1}
              height={1}
              fill={palette.p}
            />
          </g>
        ))}
      </svg>
    </a>
  )
}
