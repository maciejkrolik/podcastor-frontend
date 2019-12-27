const routes = [
  {
    path: '/',
    redirect: 'home',
    component: () => import('layouts/PodcastorLayout.vue'),
    children: [
      {path: 'home', component: () => import('pages/Home.vue')},
      {path: 'podcasts', component: () => import('pages/Podcasts.vue')},
      {path: 'discover', component: () => import('pages/Discover.vue')},
      {path: 'profile', component: () => import('pages/Profile.vue')}
    ]
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
