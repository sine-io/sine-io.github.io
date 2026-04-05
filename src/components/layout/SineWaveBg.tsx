export function SineWaveBg() {
  return (
    <div
      aria-hidden="true"
      data-testid="sine-wave-bg"
      className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden opacity-15"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-40 180C120 80 260 80 420 180C580 280 720 280 880 180C1040 80 1180 80 1340 180C1500 280 1640 280 1800 180"
          stroke="#5DE3E9"
          strokeWidth="2"
        />
        <path
          d="M-80 360C80 260 220 260 380 360C540 460 680 460 840 360C1000 260 1140 260 1300 360C1460 460 1600 460 1760 360"
          stroke="#75B3E1"
          strokeWidth="2"
        />
        <path
          d="M-20 580C140 480 280 480 440 580C600 680 740 680 900 580C1060 480 1200 480 1360 580C1520 680 1660 680 1820 580"
          stroke="#8582E1"
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}
