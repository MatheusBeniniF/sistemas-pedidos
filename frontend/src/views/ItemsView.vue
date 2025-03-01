<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderItem, useEditOrderItem, useDeleteOrderItem } from '@/hooks/useRequests'
import { useProducts } from '@/hooks/useProducts'

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

const { mutate: editOrderItem } = useEditOrderItem()
const { mutate: deleteOrderItem } = useDeleteOrderItem()

const isModalVisible = ref(false)
const isDeleteModalVisible = ref(false)
const selectedItem = ref(null)
const newProductId = ref(null)
const newQuantity = ref(1)

const findProductById = (productId: number) => {
  const product = products.value ? products.value.find((product) => product.id === productId) : null
  return product
}

const itemsHeaders = [
  { title: 'Id do pedido', key: 'request_id', value: 'request_id' },
  { title: 'Produto Id', key: 'product_id', value: 'product_id' },
  { title: 'Quantidade', key: 'quantity', value: 'quantity' },
  { title: 'Preço', key: 'price', value: 'price' },
  { title: 'Ação', key: 'action', value: 'action' },
]

const productHeaders = [
  { title: 'Id', key: 'id' },
  { title: 'Nome', key: 'name' },
  { title: 'Preço', key: 'price' },
]

const openEditModal = (item) => {
  selectedItem.value = item
  newProductId.value = item.product_id
  newQuantity.value = item.quantity
  isModalVisible.value = true
}

const saveEdits = () => {
  const updatedItem = {
    id: selectedItem.value.id,
    request_id: selectedItem.value.request_id,
    product_id: newProductId.value ? Number(newProductId.value.split('-')[2]) : item.product_id,
    quantity: Number(newQuantity.value),
  }

  editOrderItem(updatedItem)

  isModalVisible.value = false
}

const openDeleteModal = (item) => {
  selectedItem.value = item
  isDeleteModalVisible.value = true
}

const confirmDelete = () => {
  deleteOrderItem(selectedItem.value.request_id)
  isDeleteModalVisible.value = false
}

const getProducts = () => {
  return products.value
    ? products.value.map((product) => `${product.name} - R$${product.price} - ${product.id}`)
    : []
}
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

    <v-alert v-if="isProductsLoading" type="info"> Carregando produtos... </v-alert>

    <v-data-table
      v-if="!isLoading && !isError && !isProductsLoading && orderItems"
      :headers="itemsHeaders"
      :items="orderItems"
    >
      <template v-slot:item.product="{ item }">
        <span>{{ findProductById(item.product_id)?.name || 'Produto não encontrado' }}</span>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn class="mx-1" size="x-small" color="primary" @click="openEditModal(item)"
          >Editar</v-btn
        >

        <v-btn class="mx-1" size="x-small" color="error" @click="openDeleteModal(item)"
          >Excluir</v-btn
        >
      </template>
    </v-data-table>

    <v-dialog v-model="isModalVisible" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Editar Item do Pedido</span>
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="newProductId"
            :items="getProducts()"
            item-value="id"
            label="Selecione o Produto"
          ></v-select>

          <v-text-field
            v-model="newQuantity"
            label="Quantidade"
            type="number"
            min="1"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="saveEdits">Salvar</v-btn>
          <v-btn @click="isModalVisible = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="isDeleteModalVisible" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Deletar Pedido</span>
        </v-card-title>
        <v-card-text>
          <p>Tem certeza de que deseja excluir o pedido?</p>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="isModalVisible = false">Cancelar</v-btn>
          <v-btn color="error" @click="confirmDelete">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
