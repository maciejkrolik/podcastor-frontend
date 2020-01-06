import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import routes from './routes'

require('../store/subscriber');

Vue.use(VueRouter);

import Default from "../layouts/Default";
import NoDrawer from "../layouts/NoDrawer";

Vue.component('default-layout', Default);
Vue.component('no-drawer-layout', NoDrawer);

store.dispatch('auth/attempt', localStorage.getItem('token'));

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
    scrollBehavior: () => ({x: 0, y: 0}),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  return Router
}
