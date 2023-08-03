// 该文件专门用于创建整个应用的路由器
import VueRouter from 'vue-router'

// 创建并暴露一个路由器
export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: "/login",
      name: 'login',
      component: () => import('../components/login/Login.vue')
    },
    {
      path: "/register",
      name: 'register',
      component: () => import('../components/login/Register.vue')
    },
    {
      path: '/index',
      redirect: '/index/',
      name: 'index',
      component: () => import('../views/indexView.vue'),
      children: [
        {
          path: '/index/',
          name: 'home',
          component: () => import('../components/home/index.vue'),
        },
        {
          path: '/index/addquestions',
          name: 'addquestions',
          component: () => import('../views/addView.vue'),
        },
        {
          path: '/index/viewQuestions',
          name: 'viewQuestions',
          component: () => import('../views/viewQuestionsView.vue'),
        },
        {
          path: '/index/loveQuestions',
          name: 'loveQuestions',
          component: () => import('../views/favoritesView.vue'),
        },
        {
          path: '/index/removeQuestions',
          name: 'removeQuestions',
          component: () => import('../views/recycleBinView.vue'),
        },
      ],
    },
    {
      path: '/viewquestion',
      name: 'viewquestion',
      component: () => import('../components/view/viewQuestions.vue')
    },
    {
      path: '/questionIndex',
      name: '/questionIndex',
      component: () => import('../components/view/questionIndex')
    },
  ]
})
