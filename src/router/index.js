

import { createRouter, createWebHashHistory } from "vue-router"


const home = () => import('../views/home.vue') //主页
const refSetup = () => import('../views/refSetup.vue') //refsetup
const todoList = () => import('../views/todoList.vue') //todoList
const compositionANDoption = () => import('../views/compositionANDoption.vue') //compositionANDoption

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    component: home
  },
  {
    path: "/refSetup",
    name: "refSetup",
    component: refSetup
  },
  {
    path: "/todoList",
    name: "todoList",
    component: todoList
  },
  {
    path: "/compositionANDoption",
    name: "compositionANDoption",
    component: compositionANDoption
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})