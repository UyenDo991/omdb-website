<script setup>
import { RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import TopBar from "./components/layout/TopBar.vue";
import HeaderBar from "./components/layout/HeaderBar.vue";
import FooterBar from "./components/layout/FooterBar.vue";
</script>

<template>
  <TopBar />
  <HeaderBar />
  <RouterView />
  <FooterBar />
</template>