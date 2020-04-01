import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'
import Home from '../views/Home.vue'
import InfoShow from '../views/InfoShow.vue'
import FundList from '../views/FundList.vue'
import UserList from '../views/UserList.vue'
import Business from '../views/Business.vue'
import BusinessInfo from '../views/BusinessInfo'
import BusinessClassfix from '../views/category/BusinessClassfix'
import Upload from '../components/Upload'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    redirect: '',
    children: [
      {path: '',component: Home},
      {path: '/home',name: 'home',component: Home},
      {path: '/infoshow',name: 'infoshow',component:  InfoShow},
      {path: '/fundlist',name: 'fundlist',component:  FundList},
      {path: '/userlist',name: 'userlist',component:  UserList},
      {path: '/business', name: 'business',component:  Business},
      {path: '/info/:state', name: 'BusinessInfo',component:  BusinessInfo},
      {path: '/classfix', name: 'BusinessClassfix',component:  BusinessClassfix}
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    name: '/404',
    component: NotFound
  },
  {
    path: '/upload',
    name: 'upload',
    component: Upload
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to,from,next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if(to.path == '/login' || to.path == '/register') {
    next();
  } else {
    isLogin ? next():next('/login');
  }
})
export default router
