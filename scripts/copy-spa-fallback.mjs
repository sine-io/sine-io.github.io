import { copyFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(scriptDir, '..')

await copyFile(path.join(rootDir, 'dist/index.html'), path.join(rootDir, 'dist/404.html'))
