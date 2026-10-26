const flakes = [
  { left: "7%", size: "3px", duration: "23s", delay: "-4s", drift: "16px", opacity: "0.8" },
  { left: "15%", size: "2px", duration: "27s", delay: "-15s", drift: "-12px", opacity: "0.45" },
  { left: "24%", size: "4px", duration: "19s", delay: "-8s", drift: "22px", opacity: "0.7" },
  { left: "33%", size: "2px", duration: "29s", delay: "-2s", drift: "8px", opacity: "0.4" },
  { left: "41%", size: "3px", duration: "22s", delay: "-17s", drift: "-18px", opacity: "0.65" },
  { left: "49%", size: "2px", duration: "25s", delay: "-6s", drift: "12px", opacity: "0.5" },
  { left: "58%", size: "5px", duration: "28s", delay: "-13s", drift: "-8px", opacity: "0.35" },
  { left: "66%", size: "2px", duration: "18s", delay: "-9s", drift: "18px", opacity: "0.6" },
  { left: "74%", size: "3px", duration: "26s", delay: "-3s", drift: "-14px", opacity: "0.75" },
  { left: "83%", size: "2px", duration: "24s", delay: "-19s", drift: "10px", opacity: "0.45" },
  { left: "91%", size: "4px", duration: "21s", delay: "-7s", drift: "-20px", opacity: "0.55" },
] as const

export function Snow() {
  return (
    <div className="snow" aria-hidden="true">
      {flakes.map((flake) => (
        <span
          key={flake.left}
          style={
            {
              "--left": flake.left,
              "--size": flake.size,
              "--duration": flake.duration,
              "--delay": flake.delay,
              "--drift": flake.drift,
              "--flake-opacity": flake.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}
