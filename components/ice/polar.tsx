import { Snow } from "@/components/ice/snow"

const far =
  "M0 150 C 180 110 360 176 600 122 C 860 64 1080 156 1320 104 C 1460 74 1540 96 1600 84 L1600 280 L0 280 Z"
const mid =
  "M0 168 C 200 124 420 196 680 148 C 940 104 1160 166 1380 122 C 1480 102 1540 96 1600 108 L1600 280 L0 280 Z"
const near =
  "M0 214 C 220 196 480 236 760 224 C 980 214 1120 186 1260 118 C 1360 66 1480 52 1600 78 L1600 280 L0 280 Z"

function Ridge({ className, fill, d }: { className: string; fill: string; d: string }) {
  return (
    <svg className={className} viewBox="0 0 1600 280" preserveAspectRatio="none" aria-hidden="true">
      <path d={d} fill={fill} />
    </svg>
  )
}

export function Polar() {
  return (
    <div className="polar" aria-hidden="true">
      <div className="polar-sky" />
      <div className="polar-aurora" />
      <Ridge className="ridge ridge-far" fill="#3d6176" d={far} />
      <Ridge className="ridge ridge-mid" fill="#9eb8c6" d={mid} />
      <Snow />
      <Ridge className="ridge ridge-near" fill="#f4f8fb" d={near} />
    </div>
  )
}
