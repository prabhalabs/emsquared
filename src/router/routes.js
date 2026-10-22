import HomeView from '../views/HomeView.vue'
import PrivacyView from '../views/PrivacyView.vue'

// Shared between the browser router (src/router/index.js) and the SSR
// entry (src/entry-server.js) used to prerender static pages at build time.
export const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/privacy', name: 'privacy', component: PrivacyView },
]
