export type StarNode = {
  cx: number
  cy: number
  r?: number
}

export type StarPath = {
  d: string
}

export type ConstellationFieldProps = {
  className?: string
  nodes: StarNode[]
  paths: StarPath[]
  testId?: string
}

export function ConstellationField({ className, nodes, paths, testId }: ConstellationFieldProps) {
  return (
    <svg
      data-testid={testId}
      aria-hidden="true"
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {paths.map((path, index) => (
        <path
          key={path.d}
          d={path.d}
          stroke={index % 2 === 0 ? 'rgba(166, 222, 252, 0.32)' : 'rgba(215, 243, 255, 0.28)'}
          strokeWidth="0.55"
          strokeLinecap="round"
        />
      ))}
      {nodes.map((node, index) => (
        <g key={`${node.cx}-${node.cy}-${index}`}>
          <circle cx={node.cx} cy={node.cy} r={(node.r ?? 1.2) * 1.9} fill="rgba(93, 227, 233, 0.08)" />
          <circle cx={node.cx} cy={node.cy} r={node.r ?? 1.2} fill={index % 2 === 0 ? 'rgba(166, 222, 252, 0.75)' : 'rgba(255, 255, 255, 0.72)'} />
        </g>
      ))}
    </svg>
  )
}
