<script lang="ts" setup>
import ParentSidebar from '../../components/parent/general/ParentSidebar.vue'
import Navbar from '../../components/general/Navbar.vue';
import Footer from '@/components/general/Footer.vue';
import SelectChild from '@/components/parent/parentProfile/SelectChild.vue'
import ChildrenAnalysis from '@/components/parent/childrenAnalysis/ChildrenAnalysis.vue'
import { ref } from "vue";

const selectedChild = ref(null)
</script>

<template>
    <Navbar/>
    <div class="container">
        <ParentSidebar class="sidebar" selected="Children Analysis"/>
        <div class="wrapper">
            <SelectChild @selected-child="id=>selectedChild=id"/>
            <ChildrenAnalysis :child-id="selectedChild"/>
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
.wrapper{
    margin-top: 5rem;
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