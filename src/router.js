import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Converter from './pages/Converter.vue'
import RemoverFundo from './pages/RemoverFundo.vue'
import Privacidade from './pages/Privacidade.vue'
import Termos from './pages/Termos.vue'
import Sobre from './pages/Sobre.vue'

const routes = [
  {
    path: '/',
    component: Home
  },

  {
    path: '/converter',
    component: Converter
  },

  {
    path: '/remover-fundo',
    component: RemoverFundo
  },

  {
    path: '/privacidade',
    component: Privacidade
  },

  {
    path: '/termos',
    component: Termos
  },

  {
    path: '/sobre',
    component: Sobre
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router