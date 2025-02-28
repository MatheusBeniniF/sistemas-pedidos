import ClientsView from '@/views/ClientsView.vue'
import ItemsView from '@/views/ItemsView.vue'
import ProductsView from '@/views/ProductsView.vue'
import RequestsView from '@/views/RequestsView.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/produtos' },
  { path: '/produtos', name: 'Produtos', component: ProductsView },
  { path: '/clientes', name: 'Clientes', component: ClientsView },
  { path: '/pedidos', name: 'Pedidos', component: RequestsView },
  { path: '/pedidos/:id', name: 'PedidoItens', component: ItemsView }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
