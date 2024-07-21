<script setup lang="ts">
import AdminSidebar from "@/components/admin/general/AdminSidebar.vue";
import Nanbar from "@/components/general/Navbar.vue";
import Button from "primevue/button";
import { HttpRequester } from "@/lib/APICaller";
import Dialog from "primevue/dialog";
import { ref } from "vue";
import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import { useRouter } from "vue-router";

const router = useRouter()

</script>

<template>
  <Nanbar />
  <div class="container">
    <AdminSidebar selected="Manage Courses" />
    <div class="wrapper">
    </div>  
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 12rem 1fr;
  min-height: 100vh;
}
.wrapper {
  width: 90%;
  margin-inline: auto;
  margin-top: 2rem;
}

</style>
