<script setup lang="ts">
import Navbar from "../../components/general/Navbar.vue";
import HeroSection from "../../components/landingPage/HeroSection.vue";
import Options from "../../components/general/Options.vue";
import Programs from "../../components/landingPage/Programs.vue";
import Workshop from "../../components/landingPage/Workshop.vue";
import Certificate from "../../components/landingPage/Certificate.vue";
import PersonalizedLearning from "../../components/landingPage/PersonalizedLearning.vue";
import Achievement from "../../components/landingPage/Achievement.vue";
import Footer from '../../components/general/Footer.vue'
</script>
<template>
  <main>
      <Navbar class="nav" :selected="0"/>
      <Options/>
      <HeroSection />
      <Programs/>
      <Workshop/>
      <Certificate/>
      <Achievement/>
      <PersonalizedLearning/>
      <Footer/>
  </main>
</template>

<style scoped>
.nav {
  top: 0;
  position: sticky;
}

</style>
