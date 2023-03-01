import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUser } from '../stores/user'


const requiereAuth = async (to,from,next) =>{
  const user = useUser() 
  user.loadingSesion = true
  const userData = await user.currentUser()
  if(userData){
    next()
  }else{
    next('/login')
  }
  user.loadingSesion = false
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter : requiereAuth
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
     
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/ListAnime.vue'),
      beforeEnter : requiereAuth
    },
    {
      path: '/list-edit',
      name: 'list edit',
      component: () => import('../views/EditListAnime.vue'),
      beforeEnter : requiereAuth
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterUser.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginUser.vue')
    }
  ]
})

export default router
