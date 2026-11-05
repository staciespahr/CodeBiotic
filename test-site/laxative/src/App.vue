<script setup lang="ts">
import NavigationBar from './components/shared/navigation-bar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <NavigationBar />

  <main>
    <RouterView />
  </main>
</template>