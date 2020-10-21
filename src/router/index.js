import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  {
    path:"/login",
    component:()=>import("../views/login/index.vue")
  },
  {
    path:"/main",
    component:()=>import("../views/main/index.vue"),
    children:[
      {
        path:"customer",
        component:()=>import("../views/customer/index.vue")
      },
      {
        path:"good",
        component:()=>import("../views/good/index.vue")
      },
      {
        path:"supplier",
        component:()=>import("../views/supplier/index.vue")
      },
      {
        path:"unit",
        component:()=>import("../views/unit/index.vue")
      },
      {
        path:"category",
        component:()=>import("../views/category/index.vue")
      }
    ]
  }
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
