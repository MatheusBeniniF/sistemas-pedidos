<script setup lang="ts">
import { ref } from 'vue'
import { useProducts, useCreateProduct, useEditProduct, useDeleteProduct } from '@/hooks/useProducts'

const headers = [
  { title: 'Produto', align: 'start', key: 'name', value: 'name' },
  { title: 'Preço', align: 'start', key: 'price', value: 'price' },
  { title: 'Editar / Excluir', key: 'action' },
]

const dialog = ref(false)
const isEditing = ref(false)
const productForm = ref({ id: null, name: '', price: null })

const deleteDialog = ref(false)
const productToDelete = ref(null)

const { data: products, isLoading, refetch } = useProducts()
const { mutate: createProduct } = useCreateProduct()
const { mutate: editProduct } = useEditProduct()
const { mutate: deleteProduct } = useDeleteProduct()

const openCreateProductDialog = () => {
  isEditing.value = false
  productForm.value = { id: null, name: '', price: null }
  dialog.value = true
}

const openEditProductDialog = (product) => {
  isEditing.value = true
  productForm.value = { ...product }
  dialog.value = true
}

const saveProduct = async () => {
  try {
    if (isEditing.value) {
      await editProduct({ id: productForm.value.id, product: productForm.value })
    } else {
      await createProduct(productForm.value)
    }
    closeDialog()
    refetch()
  } catch (error) {
    console.error('Erro ao salvar produto:', error)
  }
}

const handleDeleteProduct = async (id: number) => {
  try {
    await deleteProduct(id)
    refetch()
    closeDeleteDialog()
  } catch (error) {
    console.error('Erro ao excluir produto:', error)
  }
}

const openDeleteDialog = (product) => {
  productToDelete.value = product
  deleteDialog.value = true
}

const closeDeleteDialog = () => {
  deleteDialog.value = false
  productToDelete.value = null
}

const closeDialog = () => {
  dialog.value = false
}
</script>

<template>
  <v-container>
    <template v-if="isLoading">

      <v-row justify="center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-row>
    </template>

    <template v-if="!isLoading && products && products.length">

      <v-data-table 
        v-if="products" 
        :headers="headers" 
        :items="products" 
        item-value="id"
        class="product-table"
        :width="100"
        :style="{ width: '100%' }"
      >
        <template v-slot:top>
          <v-toolbar>
            <v-toolbar-title>Lista de Produtos</v-toolbar-title>
            <v-btn color="primary" @click="openCreateProductDialog">Adicionar Produto</v-btn>
          </v-toolbar>
        </template>

        <template v-slot:item.action="{ item }">
          <v-btn class="mx-1" size="x-small" @click="openEditProductDialog(item)">Editar</v-btn>
          <v-btn class="mx-1" size="x-small" color="error" @click="openDeleteDialog(item)">Excluir</v-btn>
        </template>
      </v-data-table>
    </template>

    <template v-if="!isLoading && (!products || products.length === 0)">
      <v-alert dismissible>
        Nenhum produto encontrado.
        <v-btn color="primary" @click="openCreateProductDialog">Adicionar Produto</v-btn>
      </v-alert>
    </template>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          <v-text-field v-model="productForm.name" label="Nome do Produto"></v-text-field>
          <v-text-field v-model="productForm.price" label="Preço" type="number"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog">Cancelar</v-btn>
          <v-btn color="primary" @click="saveProduct">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title>Confirmar Exclusão</v-card-title>
        <v-card-text>
          Tem certeza de que deseja excluir o produto <strong>{{ productToDelete?.name }}</strong>?
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDeleteDialog">Cancelar</v-btn>
          <v-btn color="error" @click="handleDeleteProduct(productToDelete.id)">Excluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.product-table {
  width: 100%;
  max-width: 100%;
}
</style>
