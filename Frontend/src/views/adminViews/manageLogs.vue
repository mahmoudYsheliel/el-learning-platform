<script setup lang="ts">
import AdminSidebar from "@/components/admin/general/AdminSidebar.vue";
import Nanbar from "@/components/general/Navbar.vue";
import Footer from '@/components/general/Footer.vue'
</script>

<template>
  <Nanbar />
  <div class="container">
    <AdminSidebar selected="Manage Logs" />
    <div class="wrapper"></div>
  </div>
  <Footer />
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 12rem 1fr;
  min-height: 100vh;
}
</style>
