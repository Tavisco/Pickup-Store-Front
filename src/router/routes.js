import Auth from '@okta/okta-vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: 'home' },
      { path: '/implicit/callback', component: Auth.handleCallback() },
      { path: 'home', component: () => import('pages/Home.vue') },
      { path: 'cars', component: () => import('pages/Cars.vue') }
      // { path: 'cars', component: () => import('pages/Cars.vue'), meta: { requiresAuth: true } }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
