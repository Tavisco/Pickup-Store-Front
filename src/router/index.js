import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

import Auth from '@okta/okta-vue'

Vue.use(Auth, {
  issuer: 'https://dev-223811.okta.com/oauth2/default',
  clientId: '0oa2nlctgFOTUqoOo4x6',
  redirectUri: 'http://localhost:8080/implicit/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
})

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE
  })

  Router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

  return Router
}
