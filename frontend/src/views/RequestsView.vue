<script setup lang="ts">
import { ref, computed } from 'vue'
import { useOrders, useCreateOrder, useDeleteOrder, useCreateOrderItem, useOrderItem } from '@/hooks/useRequests'
import { useClients } from '@/hooks/useClients'
import { useProducts } from '@/hooks/useProducts'
import { useRouter } from 'vue-router'

const router = useRouter()
const dialog = ref(false)
const deleteDialog = ref(false)
const itemsDialog = ref(false)
const isEditMode = ref(false)
const orderForm = ref({ client: '', product: '', quantity: 1, price: '' })
const orderToDelete = ref(null)
const orderItems = ref([])

const { data: clients, isLoading: isClientsLoading } = useClients()
const { data: products, isLoading: isProductsLoading } = useProducts()
const { data: orders, isLoading: isOrdersLoading, refetch } = useOrders()
const { mutate: createOrderItem } = useCreateOrderItem()
const { mutate: createRequest } = useCreateOrder()
const { mutate: deleteRequest } = useDeleteOrder()
const { data: orderItem, refetch: refetchOrderItem, orderId } = useOrderItem();

const headers = [
  { title: 'ID', key: 'id', value: 'id' },
  { title: 'Cliente', key: 'client', value: 'client' },
  { title: 'Ação', key: 'action' },
]

const getClient = (id: number) => {
  const client = clients.value?.find(client => client.id === id)
  return client ? client.name : 'Cliente não encontrado'
}

const getClients = () => {
  return clients.value ? clients.value.map(client => `${client.name} - ${client.email} - ${client.id}`) : []
}

const getProducts = () => {
  return products.value ? products.value.map(product => `${product.name} - ${product.price} - ${product.id}`) : []
}

const getProductName = (productId: number) => {
  const product = products.value?.find(product => product.id === productId)
  return product ? product.name : 'Produto não encontrado'
}

const viewOrderItems = (order) => {
  console.log("order =>>>>>", order)
  router.push(`/pedidos/${order.id}`)
}

const closeItemsDialog = () => {
  itemsDialog.value = false
}

const openCreateOrderDialog = () => {
  isEditMode.value = false
  orderForm.value = { client: '', product: '', quantity: 1, price: '' }
  dialog.value = true
}

const saveOrder = async () => {
  try {
    const orderId = await new Promise<number>((resolve, reject) => {
      createRequest(
        Number(orderForm.value.client.split(' - ')[2]),
        {
          onSuccess: (response) => {
            if (!response?.createdRequest?.id) {
              console.error('Erro: Pedido criado sem ID');
              reject('Pedido criado sem ID');
            }
            resolve(response.createdRequest.id);
          },
          onError: (error) => {
            console.error('Erro ao criar pedido:', error);
            reject(error);
          },
        }
      );
    });

    await new Promise<void>((resolve, reject) => {
      createOrderItem(
        {
          request_id: orderId,
          product_id: Number(orderForm.value.product.split(' - ')[2]),
          quantity: Number(orderForm.value.quantity),
        },
        {
          onSuccess: () => resolve(),
          onError: (error) => {
            console.error('Erro ao criar item do pedido:', error);
            reject(error);
          },
        }
      );
    });

    closeDialog();
    refetch();
  } catch (error) {
    console.error('Erro ao salvar pedido:', error);
  }
}

const openDeleteOrderDialog = (order) => {
  orderToDelete.value = order
  deleteDialog.value = true
}

const deleteOrder = async (id: number) => {
  try {
    await deleteRequest(id)
    refetch()
    closeDeleteDialog()
  } catch (error) {
    console.error('Erro ao excluir pedido:', error)
  }
}

const closeDeleteDialog = () => {
  deleteDialog.value = false
  orderToDelete.value = null
}

const closeDialog = () => {
  dialog.value = false
}
</script>

<template>
  <v-container>
    <v-data-table :headers="headers" :items="orders" item-value="id">
      <template v-slot:top>
        <v-toolbar>
          <v-toolbar-title>Lista de Pedidos</v-toolbar-title>
          <v-btn color="primary" @click="openCreateOrderDialog">Adicionar Pedido</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.client="{ item }">
        <span>{{ getClient(item.client_id) }}</span>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn class="mx-1" size="x-small" @click="viewOrderItems(item)">Ver Itens</v-btn>
        <v-btn class="mx-1" size="x-small" color="primary" @click="openEditOrderDialog(item)">Editar</v-btn>
        <v-btn class="mx-1" size="x-small" color="error" @click="openDeleteOrderDialog(item)">Excluir</v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>{{ isEditMode ? 'Editar Pedido' : 'Adicionar Pedido' }}</v-card-title>
        <v-card-text>
          <v-select :items="getClients()" label="Selecione o Cliente" item-text="name" item-value="id"
            v-model="orderForm.client" :loading="isClientsLoading" :disabled="isClientsLoading" />
          <v-select :items="getProducts()" label="Selecione o Produto" item-text="name" item-value="id"
            v-model="orderForm.product" :loading="isProductsLoading" :disabled="isProductsLoading"
            @update:modelValue="updateProductPrice" />
          <v-text-field label="Quantidade" v-model="orderForm.quantity" type="number" min="1" />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog">Cancelar</v-btn>
          <v-btn color="primary" @click="saveOrder">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title>Confirmar Exclusão</v-card-title>
        <v-card-text>
          Tem certeza de que deseja excluir o pedido <strong>{{ orderToDelete?.id }}</strong>?
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDeleteDialog">Cancelar</v-btn>
          <v-btn color="error" @click="deleteOrder(orderToDelete.id)">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
