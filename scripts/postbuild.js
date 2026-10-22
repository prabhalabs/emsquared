import { copyFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve(import.meta.dirname, '..', 'dist')
const indexHtml = resolve(dist, 'index.html')

// GitHub Pages serves this for any unmatched path, letting vue-router
// take over client-side — but the response still carries a 404 status,
// which breaks automated link checkers (e.g. Google Play's privacy
// policy URL validator) that don't execute JavaScript.
copyFileSync(indexHtml, resolve(dist, '404.html'))

// Pre-render each non-root route to its own static file so GitHub Pages
// can serve it directly with a 200 status instead of relying on the
// 404 fallback above.
const routes = ['privacy']
for (const route of routes) {
  const dir = resolve(dist, route)
  mkdirSync(dir, { recursive: true })
  copyFileSync(indexHtml, resolve(dir, 'index.html'))
}
