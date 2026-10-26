"use client"

import { useSyncExternalStore } from "react"

const storageKey = "y2k-visit-count"
const sessionKey = "y2k-visit-marked"

let snapshot: number | null = null

function readSnapshot() {
  if (snapshot !== null) return snapshot
  try {
    let next = Number(window.localStorage.getItem(storageKey) || "0")
    if (!Number.isFinite(next) || next < 0) next = 0
    if (!window.sessionStorage.getItem(sessionKey)) {
      next += 1
      window.localStorage.setItem(storageKey, String(next))
      window.sessionStorage.setItem(sessionKey, "1")
    }
    snapshot = next
  } catch {
    snapshot = 1
  }
  return snapshot
}

function subscribe() {
  return () => {}
}

export function VisitCounter() {
  const count = useSyncExternalStore(subscribe, readSnapshot, () => null)
  const digits = count === null ? "------" : String(Math.floor(count)).padStart(6, "0")
  return <strong className="counter">{digits}</strong>
}
