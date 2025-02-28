<script setup lang="ts">
import { ref } from 'vue'
import { useClients, useCreateClient, useEditClient, useDeleteClient } from '../hooks/useClients'

const headers = [
  { title: 'Nome', align: 'start', key: 'name', value: 'name' },
  { title: 'Email', align: 'start', key: 'email', value: 'email' },
  { title: 'Editar / Excluir', key: 'action' },
]

const dialog = ref(false)
const isEditing = ref(false)
const clientForm = ref({ id: null, name: '', email: '' })
const deleteDialog = ref(false)
const clientToDelete = ref(null)

const { data: clients, isLoading, refetch } = useClients()
const { mutate: createClient } = useCreateClient()
const { mutate: editClient } = useEditClient()
const { mutate: deleteClient } = useDeleteClient()

const openCreateClientDialog = () => {
  isEditing.value = false
  clientForm.value = { id: null, name: '', email: '' }
  dialog.value = true
}

const openEditClientDialog = (client) => {
  isEditing.value = true
  clientForm.value = { ...client }
  dialog.value = true
}

const saveClient = async () => {
  if (isEditing.value) {
    await editClient({ id: clientForm.value.id, client: clientForm.value })
  } else {
    await createClient(clientForm.value)
  }
  closeDialog()
  refetch()
}

const openDeleteDialog = (client) => {
  clientToDelete.value = client
  deleteDialog.value = true
}

const handleDeleteClient = async (id) => {
  await deleteClient(id)
  refetch()
  closeDeleteDialog()
}

const closeDialog = () => {
  dialog.value = false
}

const closeDeleteDialog = () => {
  deleteDialog.value = false
  clientToDelete.value = null
}
</script>

<template>
  <v-container>
    <v-data-table :headers="headers" :items="clients" item-value="name">
      <template v-slot:top>
        <v-toolbar>
          <v-toolbar-title>Lista de Clientes</v-toolbar-title>
          <v-btn color="primary" @click="openCreateClientDialog">Adicionar Cliente</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn class="mx-1" size="x-small" @click="openEditClientDialog(item)">Editar</v-btn>
        <v-btn class="mx-1" size="x-small" color="error" @click="openDeleteDialog(item)">Excluir</v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>{{ isEditing ? 'Editar Cliente' : 'Adicionar Cliente'}}</v-card-title>
        <v-card-text>
          <v-text-field v-model="clientForm.name" label="Nome"></v-text-field>
          <v-text-field v-model="clientForm.email" label="Email"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog">Cancelar</v-btn>
          <v-btn color="primary" @click="saveClient">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="deleteDialog" max-width="500px">
      <v-card>
        <v-card-title>Confirmar Exclusão</v-card-title>
        <v-card-text>
          Tem certeza de que deseja excluir o cliente <strong>{{ clientToDelete?.name }}</strong>?
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDeleteDialog">Cancelar</v-btn>
          <v-btn color="error" @click="handleDeleteClient(clientToDelete.id)">Excluir</v-btn>
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
