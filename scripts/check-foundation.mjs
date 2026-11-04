import { createHash } from 'node:crypto'
import { readdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const foundation = resolve(root, 'public/foundation/v0.1.0')
const checksums = await readFile(resolve(foundation, 'SHA256SUMS.txt'), 'utf8')
const version = (await readFile(resolve(foundation, 'VERSION'), 'utf8')).trim()
const release = (await readFile(resolve(foundation, 'RELEASE.sha256'), 'utf8')).trim()

if (version !== '0.1.0') throw new Error(`Expected pinned Foundation 0.1.0, found ${version}`)
if (!/^[a-f0-9]{64}  druks-foundation-v0\.1\.0\.zip$/.test(release)) {
  throw new Error('Foundation release checksum is missing or malformed')
}

for (const line of checksums.trim().split('\n')) {
  const match = line.match(/^([a-f0-9]{64})  (.+)$/)
  if (!match) throw new Error(`Malformed Foundation checksum entry: ${line}`)
  const [, expected, relativePath] = match
  const content = await readFile(resolve(foundation, relativePath))
  const actual = createHash('sha256').update(content).digest('hex')
  if (actual !== expected) throw new Error(`Foundation file checksum mismatch: ${relativePath}`)
}

const tokens = await readFile(resolve(root, 'src/styles/tokens.css'), 'utf8')
if (!tokens.includes("@import url('/foundation/v0.1.0/druks-base.css');")) {
  throw new Error('Website styles do not import the pinned Foundation CSS')
}
const packageLogo = await readFile(resolve(foundation, 'brand-lockup.svg'))
const importedLogo = await readFile(resolve(root, 'src/assets/brand-lockup.svg'))
if (!packageLogo.equals(importedLogo)) throw new Error('Inline logo source differs from the pinned Foundation package')

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = resolve(directory, entry.name)
    if (entry.isDirectory()) return collectSourceFiles(path)
    return entry.isFile() ? [path] : []
  }))
  return nested.flat()
}

const sourceFiles = await collectSourceFiles(resolve(root, 'src'))
const literalColor = /#[\da-f]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\s*\(/i
const violations = []

for (const path of sourceFiles) {
  const extension = path.slice(path.lastIndexOf('.'))
  const source = await readFile(path, 'utf8')
  const styleBlocks = extension === '.css'
    ? [source]
    : extension === '.astro'
      ? [...source.matchAll(/<style(?:\s[^>]*)?>([\s\S]*?)<\/style>/gi)].map((match) => match[1])
      : []

  for (const block of styleBlocks) {
    const css = block.replace(/\/\*[\s\S]*?\*\//g, '')
    for (const rule of css.split('}')) {
      const body = rule.slice(rule.lastIndexOf('{') + 1)
      for (const declaration of body.split(';')) {
        const match = declaration.match(/^\s*([\w-]+)\s*:\s*([\s\S]*)$/)
        if (!match) continue
        const [, property, value] = match
        if (property.startsWith('--') || property === 'box-shadow') continue
        if (literalColor.test(value)) violations.push(`${path.slice(root.length + 1)}: ${property}: ${value.trim()}`)
      }
    }
  }
}

if (violations.length) {
  throw new Error(`Use Foundation tokens instead of literal style colors:\n${violations.join('\n')}`)
}

console.log(`Foundation ${version} files match their SHA-256 checksums (${release.split('  ')[0]} release bundle).`)
