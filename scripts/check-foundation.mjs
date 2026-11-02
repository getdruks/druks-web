import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
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

console.log(`Foundation ${version} files match their SHA-256 checksums (${release.split('  ')[0]} release bundle).`)
