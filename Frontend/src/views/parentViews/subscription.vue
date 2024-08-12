<script lang="ts" setup>
import ParentSidebar from '../../components/parent/general/ParentSidebar.vue'
import Navbar from '../../components/general/Navbar.vue';
import Footer from '@/components/general/Footer.vue';
</script>

<template>
    <Navbar/>
    <div class="container">
        <ParentSidebar class="sidebar" selected="subscriptions"/>
        <div class="wrapper">

        </div>
    </div>
<Footer/>

</template>

<style scoped>
.container{
    display: grid;
    grid-template-columns: 12rem 1fr;
    min-height: 100vh;
}
@media screen and (max-width: 1000px) {
  .container {
  grid-template-columns:  90vw;
  min-height: 100vh;
}
.sidebar{
  display: none;
}
}
</style>