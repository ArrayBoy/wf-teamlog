import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Dashboard from '@/components/Dashboard'

import UserList from '@/components/user/list'
import projectList from '@/components/project/list'
Vue.use(Router)

let router = new Router({
  //mode: 'history',
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: '/dashboard',
      leaf: true, // 只有一个节点
      menuShow: true,
      iconCls: 'iconfont icon-home', // 图标样式class
      children: [
        {path: '/dashboard', component: Dashboard, name: '项目列表', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '用户管理',
      menuShow: true,
      leaf: true, // 只有一个节点
      iconCls: 'iconfont icon-users', // 图标样式class
      children: [
        {path: '/user/list', component: UserList, name: '个人工时', menuShow: true}
      ]
    },
    {
      path: '/',
      component: Home,
      name: '项目管理',
      menuShow: true,
      iconCls: 'iconfont icon-books',
      children: [
        {path: '/book/list', component: projectList, name: '项目列表', menuShow: true},
      ]
    },
    // {
      // path: '/',
      // component: Home,
      // name: '设置',
      // menuShow: true,
      // iconCls: 'iconfont icon-setting1',
      // children: [
        // {path: '/user/profile', component: UserProfile, name: '个人信息', menuShow: true},
        // {path: '/user/changepwd', component: UserChangePwd, name: '修改密码', menuShow: true}
      // ]
    // }
  ]
})

router.beforeEach((to, from, next) => {
  // console.log('to:' + to.path)
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('access-user')
    next()
  } else {
    let user = JSON.parse(window.localStorage.getItem('access-user'))
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

export default router
