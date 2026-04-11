import { access, copyFile, readFile } from 'node:fs/promises'
import { constants } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(scriptDir, '..')

const distDir = path.join(rootDir, 'dist')
const indexPath = path.join(distDir, 'index.html')
const fallbackPath = path.join(distDir, '404.html')
const cnamePath = path.join(distDir, 'CNAME')

async function assertReadable(filePath) {
  try {
    await access(filePath, constants.R_OK)
  } catch {
    throw new Error(`Required build artifact is missing or unreadable: ${path.relative(rootDir, filePath)}`)
  }
}

await assertReadable(indexPath)
await copyFile(indexPath, fallbackPath)
await assertReadable(fallbackPath)
await assertReadable(cnamePath)

const [indexHtml, fallbackHtml] = await Promise.all([
  readFile(indexPath, 'utf8'),
  readFile(fallbackPath, 'utf8')
])

if (indexHtml !== fallbackHtml) {
  throw new Error('SPA fallback verification failed: dist/404.html does not match dist/index.html')
}
