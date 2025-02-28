<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Sistema de Pedidos</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app>
      <v-list>
        <v-list-item link to="/produtos">
          <v-list-item-title>Produtos</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/clientes">
          <v-list-item-title>Clientes</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/pedidos">
          <v-list-item-title>Pedidos</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>

  </v-app>
</template>

<script setup lang="ts">
</script>
