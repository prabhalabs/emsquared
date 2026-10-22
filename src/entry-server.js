import { createSSRApp } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { renderToString } from '@vue/server-renderer'
import App from './App.vue'
import { routes } from './router/routes'

// Renders a route to an HTML string for build-time static generation
// (see scripts/postbuild.js). Not part of the client bundle — only loaded
// by that script via Vite's SSR module runner.
export async function renderRoute(url) {
  const app = createSSRApp(App)
  const router = createRouter({ history: createMemoryHistory(), routes })

  app.use(router)
  router.push(url)
  await router.isReady()

  return renderToString(app)
}
