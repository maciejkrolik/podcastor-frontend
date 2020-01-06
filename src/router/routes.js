import store from '../store';

const routes = [
  {path: '', component: () => import('pages/Home.vue'), meta: {layout: 'no-drawer'}},
  {path: '/login', component: () => import('pages/Login.vue'), meta: {layout: 'no-drawer'}},
  {path: '/register', component: () => import('pages/Register.vue'), meta: {layout: 'no-drawer'}},
  {
    path: '/podcasts',
    component: () => import('pages/Podcasts.vue'),
    beforeEnter: (to, from, next) => authMiddleware(to, from, next)
  },
  {
    path: '/discover',
    component: () => import('pages/Discover.vue'),
    beforeEnter: (to, from, next) => authMiddleware(to, from, next)
  },
  {
    path: '/profile',
    component: () => import('pages/Profile.vue'),
    beforeEnter: (to, from, next) => authMiddleware(to, from, next)
  }
];

let authMiddleware = function (to, from, next) {
  if (!store.getters['auth/authenticated']) {
    console.log('test');
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
