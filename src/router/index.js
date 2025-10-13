import { createRouter, createWebHistory } from 'vue-router';

function auth(to, from) {
  if (!localStorage.getItem('access_token')) {
    return { name: 'login' };
  }
}

function guest(to, from) {
  if (localStorage.getItem('access_token')) {
    return { name: 'vehicles.index' };
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      beforeEnter: guest,
      component: () => import('@/views/Auth/RegisterView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: guest,
      component: () => import('@/views/Auth/LoginView.vue'),
    },
    {
      path: '/profile',
      name: 'profile.edit',
      beforeEnter: auth,
      component: () => import('@/views/Profile/EditView.vue'),
    },
    {
      path: '/profile/change-password',
      name: 'profile.change-password',
      beforeEnter: auth,
      component: () => import('@/views/Profile/ChangePassword.vue'),
    },
    {
      path: '/vehicles',
      name: 'vehicles.index',
      beforeEnter: auth,
      component: () => import('@/views/Vehicles/IndexView.vue'),
    },
    {
      path: '/vehicles/create',
      name: 'vehicles.create',
      beforeEnter: auth,
      component: () => import('@/views/Vehicles/CreateView.vue'),
    },
  ],
});

export default router;
