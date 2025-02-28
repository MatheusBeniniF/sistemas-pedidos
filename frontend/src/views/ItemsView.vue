<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderItem } from '@/hooks/useRequests'
import { useProducts } from '@/hooks/useProducts'
import axios from 'axios'
const route = useRoute()
const orderId = ref(route.params.id)
const {
  data: orderItems,
  isLoading,
  isError,
  isSuccess,
  error,
  refetch,
} = useOrderItem(orderId.value)
const { data: products, isLoading: isProductsLoading } = useProducts()

const itemsHeaders = [
  { title: 'Id do pedido', key: 'request_id', value: 'request_id' },
  { title: 'Produto', key: 'product_id', value: 'product_id' },
  { title: 'Quantidade', key: 'quantity', value: 'quantity' },
  { title: 'Preco', key: 'price', value: 'price' },
]
</script>

<template>
  <v-container>
    <v-btn @click="$router.push('/pedidos')" class="mb-2">Voltar</v-btn>
    <h1>Itens do Pedido #{{ route.params.id }}</h1>

    <v-progress-circular
      v-if="isLoading || isProductsLoading"
      indeterminate
      color="primary"
    ></v-progress-circular>
    <v-alert v-if="isError" type="error">Erro ao carregar itens do pedido</v-alert>

    <v-data-table
      v-if="!isLoading && !isError"
      :headers="itemsHeaders"
      :items="orderItems ? orderItems : []"
    >
      <template v-slot:item.product="{ item }">
      </template>
    </v-data-table>
  </v-container>
</template>
