"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

const OUT_MS = 680
const IN_MS = 760
const FADE_MS = 180

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function easeInCubic(value: number) {
  return value * value * value
}

function easeOutCubic(value: number) {
  return 1 - (1 - value) ** 3
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function animate(duration: number, ease: (value: number) => number, onFrame: (value: number) => void) {
  return new Promise<void>((resolve) => {
    const started = performance.now()
    const frame = (now: number) => {
      const t = Math.min(1, (now - started) / duration)
      onFrame(ease(t))
      if (t < 1) requestAnimationFrame(frame)
      else resolve()
    }
    requestAnimationFrame(frame)
  })
}

export function WorldShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const worldRef = useRef<HTMLDivElement>(null)
  const coverRef = useRef<SVGSVGElement>(null)
  const holeRef = useRef<SVGCircleElement>(null)
  const fillRef = useRef<SVGRectElement>(null)
  const pathRef = useRef(pathname)
  const waitersRef = useRef<Array<(path: string) => void>>([])
  const busyRef = useRef(false)

  useEffect(() => {
    pathRef.current = pathname
    const waiters = waitersRef.current
    waitersRef.current = []
    for (const waiter of waiters) waiter(pathname)
  }, [pathname])

  useEffect(() => {
    function waitForPath(expected: string) {
      if (pathRef.current === expected) return Promise.resolve()
      return new Promise<void>((resolve) => {
        const timeout = window.setTimeout(() => {
          waitersRef.current = waitersRef.current.filter((waiter) => waiter !== check)
          resolve()
        }, 4000)
        function check(next: string) {
          if (next !== expected) return
          window.clearTimeout(timeout)
          resolve()
        }
        waitersRef.current.push(check)
      })
    }

    function viewport() {
      return { width: window.innerWidth, height: window.innerHeight }
    }

    function syncCover() {
      const cover = coverRef.current
      const fill = fillRef.current
      const maskRect = cover?.querySelector("[data-mask-rect]")
      if (!cover || !fill || !(maskRect instanceof SVGRectElement)) return
      const { width, height } = viewport()
      cover.setAttribute("viewBox", `0 0 ${width} ${height}`)
      fill.setAttribute("width", String(width))
      fill.setAttribute("height", String(height))
      maskRect.setAttribute("width", String(width))
      maskRect.setAttribute("height", String(height))
    }

    function maxRadius() {
      const { width, height } = viewport()
      return Math.hypot(width, height) + 24
    }

    function setHole(x: number, y: number, radius: number) {
      const hole = holeRef.current
      if (!hole) return
      hole.setAttribute("cx", String(x))
      hole.setAttribute("cy", String(y))
      hole.setAttribute("r", String(Math.max(0, radius)))
    }

    function lockOrigin(x: number, y: number) {
      const world = worldRef.current
      if (!world) return
      const rect = world.getBoundingClientRect()
      world.style.transformOrigin = `${x - rect.left}px ${y - rect.top}px`
    }

    function setStretch(amount: number) {
      const world = worldRef.current
      if (!world) return
      const sx = 1 + amount * 0.46
      const sy = 1 + amount * 0.72
      world.style.transform = `scale(${sx.toFixed(4)}, ${sy.toFixed(4)})`
    }

    function showCover(color: string) {
      const cover = coverRef.current
      const fill = fillRef.current
      if (!cover || !fill) return
      syncCover()
      fill.setAttribute("fill", color)
      cover.style.opacity = "1"
      cover.dataset.active = "true"
    }

    function hideCover() {
      const cover = coverRef.current
      const world = worldRef.current
      if (cover) {
        cover.dataset.active = "false"
        cover.style.opacity = "0"
      }
      if (world) {
        world.style.transform = ""
        world.style.transformOrigin = ""
        delete world.dataset.warping
      }
    }

    async function travel(anchor: HTMLAnchorElement) {
      if (busyRef.current) return
      const href = anchor.getAttribute("href")
      if (!href || /^(https?:|mailto:)/.test(href)) return
      const url = new URL(href, window.location.href)
      if (url.pathname === pathRef.current) return
      const reduced = prefersReducedMotion()
      const rect = anchor.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      const color = url.pathname === "/y2k" ? "#9dc6f6" : "#e7f3f8"
      const world = worldRef.current
      const cover = coverRef.current
      busyRef.current = true
      const previousOverflow = document.documentElement.style.overflow
      document.documentElement.style.overflow = "hidden"

      try {
        if (reduced) {
          showCover(color)
          setHole(x, y, 0)
          if (cover) cover.style.opacity = "0"
          await animate(FADE_MS, easeInCubic, (value) => {
            if (cover) cover.style.opacity = String(value)
          })
          router.push(href)
          await waitForPath(url.pathname)
          await wait(20)
          await animate(FADE_MS + 40, easeOutCubic, (value) => {
            if (cover) cover.style.opacity = String(1 - value)
          })
          return
        }

        if (world) world.dataset.warping = "out"
        lockOrigin(x, y)
        showCover(color)
        setHole(x, y, maxRadius())
        await animate(OUT_MS, easeInCubic, (value) => {
          setHole(x, y, maxRadius() * (1 - value))
          setStretch(value)
        })
        router.push(href)
        await waitForPath(url.pathname)
        await wait(32)
        if (world) world.dataset.warping = "in"
        lockOrigin(x, y)
        setStretch(1)
        setHole(x, y, 0)
        await animate(IN_MS, easeOutCubic, (value) => {
          setHole(x, y, maxRadius() * value)
          setStretch(1 - value)
        })
      } finally {
        document.documentElement.style.overflow = previousOverflow
        hideCover()
        busyRef.current = false
      }
    }

    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const target = event.target
      if (!(target instanceof Element)) return
      const anchor = target.closest("a[data-portal]")
      if (!(anchor instanceof HTMLAnchorElement)) return
      event.preventDefault()
      void travel(anchor)
    }

    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [router])

  return (
    <>
      <div className="world" ref={worldRef}>
        {children}
      </div>
      <svg ref={coverRef} className="portal-cover" aria-hidden="true">
        <defs>
          <mask id="portal-mask" maskUnits="userSpaceOnUse">
            <rect data-mask-rect="" x="0" y="0" width="1" height="1" fill="white" />
            <circle ref={holeRef} cx="0" cy="0" r="0" fill="black" />
          </mask>
        </defs>
        <rect ref={fillRef} x="0" y="0" width="1" height="1" fill="#e7f3f8" mask="url(#portal-mask)" />
      </svg>
    </>
  )
}
