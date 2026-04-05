import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { optimize } from 'svgo'
import svgoConfig from '../svgo.config.mjs'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(scriptDir, '..')

const drawablePattern = /<(path|rect|ellipse|circle|line|polyline|polygon)\b[\s\S]*?\/>/g

const derivatives = [
  {
    input: 'SVG1.svg',
    output: 'src/assets/visuals/svg1-optimized.svg',
    crop: { x: 900, y: 0, width: 980, height: 860 },
    targetStrokeCount: 160,
    targetFillCount: 240,
    minSelectedElements: 280,
    maxOutputBytes: 200_000
  },
  {
    input: 'SVG2.svg',
    output: 'src/assets/visuals/svg2-optimized.svg',
    crop: { x: 900, y: 0, width: 980, height: 760 },
    targetStrokeCount: 150,
    targetFillCount: 210,
    minSelectedElements: 260,
    maxOutputBytes: 200_000
  }
]

function cleanElement(element) {
  return element
    .replace(/\s+xmlns="[^"]*"/g, '')
    .replace(/\s+vector-effect="[^"]*"/g, '')
    .replace(/\s+(?:class|style|direction|data-[\w:-]+|stroke-linecap|stroke-linejoin)="[^"]*"/g, '')
    .trim()
}

function getElementPosition(element) {
  const translateMatch = element.match(/transform="[^"]*translate\(([-\d.]+)[,\s]+([-\d.]+)/)
  if (translateMatch) {
    return [Number(translateMatch[1]), Number(translateMatch[2])]
  }

  const matrixMatch = element.match(/transform="[^"]*matrix\(([^)]+)\)/)
  if (matrixMatch) {
    const matrixValues = matrixMatch[1]
      .split(/[,\s]+/)
      .map((value) => value.trim())
      .filter(Boolean)
      .map(Number)

    if (matrixValues.length === 6 && matrixValues.every((value) => Number.isFinite(value))) {
      return [matrixValues[4], matrixValues[5]]
    }
  }

  const moveMatch = element.match(/\bd="\s*[Mm]\s*([-\d.]+)\s+([-\d.]+)/)
  if (moveMatch) {
    return [Number(moveMatch[1]), Number(moveMatch[2])]
  }

  const centerMatch = element.match(/\bcx="([-\d.]+)"[^>]*\bcy="([-\d.]+)"/)
  if (centerMatch) {
    return [Number(centerMatch[1]), Number(centerMatch[2])]
  }

  const cornerMatch = element.match(/\bx="([-\d.]+)"[^>]*\by="([-\d.]+)"/)
  if (cornerMatch) {
    return [Number(cornerMatch[1]), Number(cornerMatch[2])]
  }

  const lineMatch = element.match(/\bx1="([-\d.]+)"[^>]*\by1="([-\d.]+)"/)
  if (lineMatch) {
    return [Number(lineMatch[1]), Number(lineMatch[2])]
  }

  const pointsMatch = element.match(/\bpoints="([^"]+)"/)
  if (pointsMatch) {
    const pointValues = pointsMatch[1]
      .trim()
      .split(/[\s,]+/)
      .map(Number)

    if (pointValues.length >= 2 && Number.isFinite(pointValues[0]) && Number.isFinite(pointValues[1])) {
      return [pointValues[0], pointValues[1]]
    }
  }

  return null
}

function isInsideCrop(element, crop) {
  const position = getElementPosition(element)
  if (!position) {
    return false
  }

  const [x, y] = position
  return x >= crop.x && x <= crop.x + crop.width && y >= crop.y && y <= crop.y + crop.height
}

function hasStroke(element) {
  return /\bstroke=/.test(element)
}

function buildDerivativeSvg(elements, crop) {
  return [
    '<svg xmlns="http://www.w3.org/2000/svg"',
    ` viewBox="${crop.x} ${crop.y} ${crop.width} ${crop.height}"`,
    ' fill="none">',
    elements.join(''),
    '</svg>'
  ].join('')
}

function selectElements(sourceSvg, derivative) {
  const allElements = sourceSvg.match(drawablePattern) ?? []
  const candidates = allElements.filter((element) => isInsideCrop(element, derivative.crop))
  const strokeCandidates = candidates.filter(hasStroke)
  const fillCandidates = candidates.filter((element) => !hasStroke(element))

  const strokeStride = Math.max(1, Math.floor(strokeCandidates.length / derivative.targetStrokeCount))
  const fillStride = Math.max(1, Math.floor(fillCandidates.length / derivative.targetFillCount))

  const selected = []
  let strokeIndex = 0
  let fillIndex = 0

  for (const element of candidates) {
    if (hasStroke(element)) {
      if (strokeIndex % strokeStride === 0) {
        selected.push(cleanElement(element))
      }
      strokeIndex += 1
      continue
    }

    if (fillIndex % fillStride === 0) {
      selected.push(cleanElement(element))
    }
    fillIndex += 1
  }

  return selected
}

async function writeDerivative(derivative) {
  const inputPath = path.join(rootDir, derivative.input)
  const outputPath = path.join(rootDir, derivative.output)
  const sourceSvg = await readFile(inputPath, 'utf8')
  const selectedElements = selectElements(sourceSvg, derivative)

  if (selectedElements.length < derivative.minSelectedElements) {
    throw new Error(
      `${derivative.input} selected only ${selectedElements.length} elements; minimum is ${derivative.minSelectedElements}`
    )
  }

  const optimized = optimize(buildDerivativeSvg(selectedElements, derivative.crop), {
    ...svgoConfig,
    path: outputPath
  })

  const outputBytes = Buffer.byteLength(optimized.data)
  if (outputBytes > derivative.maxOutputBytes) {
    throw new Error(
      `${derivative.output} is ${outputBytes} bytes; maximum allowed is ${derivative.maxOutputBytes}`
    )
  }

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, optimized.data)
}

for (const derivative of derivatives) {
  await writeDerivative(derivative)
}
