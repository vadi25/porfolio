/** Strong ease-out for entrances, exits, and press feedback. */
export const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)"

/** Strong ease-in-out for something already on screen moving from one place to another. */
export const EASE_IN_OUT = "cubic-bezier(0.77, 0, 0.175, 1)"

function sample(t: number, a: number, b: number, c: number) {
  return ((a * t + b) * t + c) * t
}

function sampleDerivative(t: number, a: number, b: number, c: number) {
  return (3 * a * t + 2 * b) * t + c
}

/** Unit cubic-bezier sampler. Built-in CSS curves are too flat for a deliberate throw. */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number, amount: number) {
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by

  let t = amount
  for (let i = 0; i < 6; i += 1) {
    const slope = sampleDerivative(t, ax, bx, cx)
    if (Math.abs(slope) < 1e-6) break
    t = Math.min(1, Math.max(0, t - (sample(t, ax, bx, cx) - amount) / slope))
  }

  return sample(t, ay, by, cy)
}

export function easeOut(amount: number) {
  return cubicBezier(0.23, 1, 0.32, 1, amount)
}
