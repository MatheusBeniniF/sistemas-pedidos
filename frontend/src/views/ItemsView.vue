<template>
    <v-select
      v-model="selectedProduct"
      :items="products"
      item-text="name"
      item-value="id"
      label="Selecione um Produto"
    />
  </template>
   
  <script setup lang="ts">
  const selectedProduct = ref(null)
  
  const products = ref([
    { id: 1, name: 'Produto 1' },
    { id: 2, name: 'Produto 2' },
  ])
  </script>
  