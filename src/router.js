import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import Converter from './pages/Converter.vue'
import RemoverFundo from './pages/RemoverFundo.vue'
import Privacidade from './pages/Privacidade.vue'
import Termos from './pages/Termos.vue'
import Sobre from './pages/Sobre.vue'
import Contato from './pages/Contato.vue'

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
  },
  {
    path: '/contato',
    component: Contato
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.afterEach((to) => {
  const titles = {
    '/': 'ImageTools — Ferramentas de imagem gratuitas',
    '/converter': 'Converter PNG, JPG e WEBP online — ImageTools',
    '/remover-fundo': 'Remover fundo de imagem online — ImageTools',
    '/sobre': 'Sobre o ImageTools',
    '/contato': 'Contato — ImageTools',
    '/privacidade': 'Política de Privacidade — ImageTools',
    '/termos': 'Termos de Uso — ImageTools'
  }
  document.title = titles[to.path] || 'ImageTools — Ferramentas de imagem'
})

export default router