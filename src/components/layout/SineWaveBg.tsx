export function SineWaveBg() {
  return (
    <div
      aria-hidden="true"
      data-testid="sine-wave-bg"
      className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden opacity-30"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sine-wave-cyan" x1="0" y1="0" x2="1440" y2="0">
            <stop stopColor="#5DE3E9" stopOpacity="0" />
            <stop offset="0.28" stopColor="#5DE3E9" stopOpacity="0.8" />
            <stop offset="0.62" stopColor="#8582E1" stopOpacity="0.55" />
            <stop offset="1" stopColor="#75B3E1" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="sine-wave-blue" x1="0" y1="0" x2="1440" y2="0">
            <stop stopColor="#75B3E1" stopOpacity="0" />
            <stop offset="0.34" stopColor="#75B3E1" stopOpacity="0.55" />
            <stop offset="0.78" stopColor="#5DE3E9" stopOpacity="0.38" />
            <stop offset="1" stopColor="#5DE3E9" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g opacity="0.28">
          <path d="M90 112C174 70 246 68 330 112C414 156 486 156 570 112C654 68 730 66 812 112" stroke="#A6DEFC" strokeWidth="1" strokeDasharray="5 12" />
          <path d="M924 628C1022 574 1116 570 1212 628C1306 684 1398 682 1498 628" stroke="#A6DEFC" strokeWidth="1" strokeDasharray="6 14" />
          <circle cx="330" cy="112" r="3" fill="#A6DEFC" />
          <circle cx="1212" cy="628" r="3" fill="#5DE3E9" />
        </g>
        <path
          d="M-40 180C120 80 260 80 420 180C580 280 720 280 880 180C1040 80 1180 80 1340 180C1500 280 1640 280 1800 180"
          stroke="url(#sine-wave-cyan)"
          strokeWidth="2"
        />
        <path
          d="M-80 360C80 260 220 260 380 360C540 460 680 460 840 360C1000 260 1140 260 1300 360C1460 460 1600 460 1760 360"
          stroke="url(#sine-wave-blue)"
          strokeWidth="2"
        />
        <path
          d="M-20 580C140 480 280 480 440 580C600 680 740 680 900 580C1060 480 1200 480 1360 580C1520 680 1660 680 1820 580"
          stroke="#8582E1"
          strokeWidth="2"
          opacity="0.55"
        />
        <path
          d="M1220 -40C1184 70 1188 154 1232 236C1276 318 1270 408 1214 522C1158 636 1164 728 1232 856"
          stroke="#5DE3E9"
          strokeWidth="1.4"
          opacity="0.42"
        />
        <path
          d="M-40 720C136 650 274 660 426 742C584 828 728 826 890 742C1046 662 1198 648 1390 720"
          stroke="#A6DEFC"
          strokeWidth="1"
          strokeDasharray="9 14"
          opacity="0.45"
        />
      </svg>
    </div>
  )
}
