import store from '../store';

const routes = [
  {path: '', component: () => import('pages/Home.vue'), meta: {layout: 'no-drawer', title: 'Home'}},
  {path: '/login', component: () => import('pages/Login.vue'), meta: {layout: 'no-drawer', title: 'Login'}},
  {path: '/register', component: () => import('pages/Register.vue'), meta: {layout: 'no-drawer', title: 'Register'}},
  {
    path: '/podcasts',
    component: () => import('pages/Podcasts.vue'),
    beforeEnter: (to, from, next) => authMiddleware(to, from, next),
    meta: {title: 'Podcasts'}
  },
  {
    path: '/discover',
    component: () => import('pages/Discover.vue'),
    beforeEnter: (to, from, next) => authMiddleware(to, from, next),
    meta: {title: 'Discover'}
  },
  {
    path: '/profile',
    component: () => import('pages/Profile.vue'),
    beforeEnter: (to, from, next) => authMiddleware(to, from, next),
    meta: {title: 'Profile'}
  }
];

let authMiddleware = function (to, from, next) {
  if (!store.getters['auth/authenticated']) {
    return next({
      path: '/'
    })
  }

  next()
};

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
    meta: {layout: 'no-drawer'}
  })
}

export default routes
