<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import TopBar from "./components/layout/TopBar.vue";
import HeaderBar from "./components/layout/HeaderBar.vue";
import Footer from "./components/layout/Footer.vue";
</script>

<template>
  <!-- <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> 

  <RouterView />-->
  <TopBar />
  <HeaderBar />
  <RouterView />
  <Footer />
</template>