<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderItem,useEditOrderItem } from '@/hooks/useRequests'
import { useProducts } from '@/hooks/useProducts'

const route = useRoute()
const orderId = ref(route.params.id)

// Hook para pegar os itens do pedido
const {
  data: orderItems,
  isLoading,
  isError,
  isSuccess,
  error,
  refetch,
} = useOrderItem(orderId.value)

// Hook para pegar os produtos
const { data: products, isLoading: isProductsLoading } = useProducts()

// Hook para editar item do pedido
const { mutate: editOrderItem } = useEditOrderItem()

// Variáveis para modal de edição
const isModalVisible = ref(false)
const selectedItem = ref(null)  // Para armazenar o item que está sendo editado
const newProductId = ref(null)
const newQuantity = ref(1)

// Função para encontrar o produto pelo ID
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

// Função para abrir o modal de edição
const openEditModal = (item) => {
  selectedItem.value = item
  newProductId.value = item.product_id
  newQuantity.value = item.quantity
  isModalVisible.value = true
}

// Função para salvar as edições do item
const saveEdits = () => {
    // Criar o objeto atualizado do item
    const updatedItem = {
      id: selectedItem.value.id,
      request_id: selectedItem.value.request_id,
      product_id: newProductId.value ? Number(newProductId.value.split('-')[2]) : item.product_id,
      quantity: Number(newQuantity.value),
    }

    // Chamar a mutation para editar o item
    editOrderItem(updatedItem)

    // Fechar o modal
    isModalVisible.value = false
}

const getProducts = () => {
  return products.value ? products.value.map(product => `${product.name} - R$${product.price} - ${product.id}`) : []
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

    <v-alert v-if="isProductsLoading" type="info">
      Carregando produtos...
    </v-alert>

    <!-- Tabela de Itens do Pedido -->
    <v-data-table
      v-if="!isLoading && !isError && !isProductsLoading && orderItems"
      :headers="itemsHeaders"
      :items="orderItems"
    >
      <template v-slot:item.product="{ item }">
        <span>{{ findProductById(item.product_id)?.name || 'Produto não encontrado' }}</span>
      </template>
      <template v-slot:item.action="{ item }">
        <!-- Botão de editar -->
        <v-btn color="primary" @click="openEditModal(item)">Editar</v-btn>
      </template>
    </v-data-table>

    <!-- Modal de Edição -->
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
  </v-container>
</template>
