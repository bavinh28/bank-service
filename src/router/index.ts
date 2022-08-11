import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import store from '@/store'


//Guard
const requireAuth = (to, from, next) => {
  const token = localStorage.getItem('token')
  console.log("before enter: ", token);
  if (!token) {
    next({ name: 'login', params: {} })
  } else {
    next();
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'auth',
    component: () => import('@/layouts/AuthView.vue'),

  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/AuthComponents/LoginView.vue')
  },
  {
    path:'/test',
    name: 'test',
    component:() => import('@/views/HomeView.vue')
  }
  ,
  {
    path: "/home",
    name: 'home',
    component: () => import('@/layouts/HomeView.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: 'account',
        name: 'Account',
        component: () => import('@/views/AccountView/ShowAccount.vue')
      },
      {
        path: 'account/add-account',
        name: 'Add-account',
        component: () => import('@/views/AccountView/AddAccount.vue')
      },
      {
        path:'profile',
        name: 'profile',
        component:()=> import('@/views/ProfileView/ProfileView.vue')
      },
      {
        path:'bill',
        name: 'Bill',
        component:()=> import('@/views/Bills/BillsView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
