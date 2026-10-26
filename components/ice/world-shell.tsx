"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"

import { EASE_IN_OUT, EASE_OUT } from "@/components/ice/easing"
import { registerPortal } from "@/components/ice/portal"

const OUT_MS = 680
const IN_MS = 560
const FADE_MS = 180

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
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
    const running: Animation[] = []

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

    function showCover(color: string) {
      const cover = coverRef.current
      const fill = fillRef.current
      if (!cover || !fill) return
      syncCover()
      fill.setAttribute("fill", color)
      cover.style.opacity = "1"
      cover.dataset.active = "true"
    }

    function stopMotion() {
      for (const animation of running) animation.cancel()
      running.length = 0
    }

    function hideCover() {
      const cover = coverRef.current
      const world = worldRef.current
      stopMotion()
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

    function play(element: Element, keyframes: Keyframe[], duration: number, easing: string) {
      const animation = element.animate(keyframes, { duration, easing, fill: "forwards" })
      running.push(animation)
      return animation.finished.catch(() => undefined)
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
      const color = url.pathname === "/y2k" ? "#8ebcf2" : "#16344e"
      const world = worldRef.current
      const cover = coverRef.current
      const hole = holeRef.current
      busyRef.current = true
      const previousOverflow = document.documentElement.style.overflow
      document.documentElement.style.overflow = "hidden"

      try {
        if (reduced || !world || !cover || !hole) {
          showCover(color)
          setHole(x, y, 0)
          if (cover) cover.style.opacity = "0"
          if (cover) {
            await play(cover, [{ opacity: 0 }, { opacity: 1 }], FADE_MS, EASE_OUT)
          }
          router.push(href)
          await waitForPath(url.pathname)
          await wait(20)
          if (cover) {
            await play(cover, [{ opacity: 1 }, { opacity: 0 }], FADE_MS, EASE_OUT)
          }
          return
        }

        world.dataset.warping = "out"
        lockOrigin(x, y)
        showCover(color)
        setHole(x, y, maxRadius())
        await Promise.all([
          play(hole, [{ r: maxRadius() }, { r: 0 }], OUT_MS, EASE_IN_OUT),
          play(world, [{ transform: "scale(1, 1)" }, { transform: "scale(1.46, 1.72)" }], OUT_MS, EASE_IN_OUT),
        ])
        stopMotion()
        world.style.transform = "scale(1.46, 1.72)"
        setHole(x, y, 0)
        router.push(href)
        await waitForPath(url.pathname)
        await wait(32)
        world.dataset.warping = "in"
        lockOrigin(x, y)
        await Promise.all([
          play(hole, [{ r: 0 }, { r: maxRadius() }], IN_MS, EASE_OUT),
          play(
            world,
            [{ transform: "scale(1.46, 1.72)" }, { transform: "scale(1, 1)" }],
            IN_MS,
            EASE_OUT,
          ),
        ])
      } finally {
        document.documentElement.style.overflow = previousOverflow
        hideCover()
        busyRef.current = false
      }
    }

    return registerPortal(travel)
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
        <rect ref={fillRef} x="0" y="0" width="1" height="1" fill="#16344e" mask="url(#portal-mask)" />
      </svg>
    </>
  )
}
