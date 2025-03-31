import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/admin',
    name: 'Layout',
    component: () => import('../layout/index.vue'),
    redirect: '/admin/dashboard',
    children: [
      {
        path: '/admin/dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard/index.vue'),
        meta: { title: '仪表盘', icon: 'Odometer' }
      },
      {
        path: '/admin/user',
        name: 'User',
        component: () => import('../views/user/index.vue'),
        meta: { title: '用户管理', icon: 'User' }
      },
      {
        path: '/admin/task',
        name: 'Task',
        component: () => import('../views/task/index.vue'),
        meta: { title: '任务管理', icon: 'List' }
      },
      {
        path: '/admin/profile',
        name: 'Profile',
        component: () => import('../views/profile/index.vue'),
        meta: { title: '个人信息', icon: 'User' }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router