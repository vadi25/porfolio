type PortalTravel = (anchor: HTMLAnchorElement) => Promise<void> | void

let travel: PortalTravel | null = null

export function registerPortal(fn: PortalTravel) {
  travel = fn
  return () => {
    if (travel === fn) travel = null
  }
}

export function runPortal(anchor: HTMLAnchorElement) {
  return travel?.(anchor)
}
