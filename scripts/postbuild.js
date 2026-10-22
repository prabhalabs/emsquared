// Prerenders select routes to static HTML files inside dist/ after the
// normal Vite client build, so hosts with no server-side rewrites (GitHub
// Pages) can serve them directly with a real HTTP 200 — instead of relying
// solely on the 404.html + index.html SPA-fallback, which returns a real
// 404 status to crawlers that don't execute JavaScript (e.g. Google Play's
// Privacy Policy URL validator).
//
// Each entry's HTML is produced by actually rendering the corresponding
// Vue route via src/entry-server.js, so the static page can never drift
// from what the SPA itself renders.
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises'
import path from 'node:path'
import { createServer } from 'vite'

const ROOT = path.resolve(import.meta.dirname, '..')
const DIST = path.join(ROOT, 'dist')

const STATIC_ROUTES = [
  {
    url: '/privacy',
    outFile: 'privacy/index.html',
    title: 'Privacy Policy — EM Squared Chess',
  },
]

async function main() {
  const shellHtml = await readFile(path.join(DIST, 'index.html'), 'utf-8')

  // GitHub Pages serves this for any unmatched path, letting vue-router
  // take over client-side — kept as a fallback for routes not listed above.
  await copyFile(path.join(DIST, 'index.html'), path.join(DIST, '404.html'))

  const vite = await createServer({
    root: ROOT,
    appType: 'custom',
    server: { middlewareMode: true },
    // The default dependency scan races with vite.close() below and logs a
    // harmless but noisy "server is being restarted or closed" error — this
    // script only ever loads one known module, so skip the scan entirely.
    optimizeDeps: { noDiscovery: true },
  })

  try {
    const { renderRoute } = await vite.ssrLoadModule('/src/entry-server.js')

    for (const route of STATIC_ROUTES) {
      const appHtml = await renderRoute(route.url)

      let html = shellHtml.replace('<div id="app"></div>', `<div id="app">${appHtml}</div>`)
      html = html.replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)

      const outPath = path.join(DIST, route.outFile)
      await mkdir(path.dirname(outPath), { recursive: true })
      await writeFile(outPath, html)
      console.log(`Prerendered ${route.url} -> dist/${route.outFile}`)
    }
  } finally {
    await vite.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
