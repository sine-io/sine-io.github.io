import { access, copyFile, readFile, writeFile } from 'node:fs/promises'
import { constants } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createGithubPagesFallbackHtml } from './spa-fallback-utils.mjs'

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
await assertReadable(cnamePath)

await copyFile(indexPath, fallbackPath)
await assertReadable(fallbackPath)

const indexHtml = await readFile(indexPath, 'utf8')
const fallbackHtml = createGithubPagesFallbackHtml(indexHtml)

await writeFile(fallbackPath, fallbackHtml, 'utf8')
