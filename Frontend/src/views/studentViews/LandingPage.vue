<script setup lang="ts">
import AboutUs from "../../components/landingPage/AboutUs.vue";
import Navbar from "../../components/landingPage/Navbar.vue";
import HeroSection from "../../components/landingPage/HeroSection.vue";
import FQA from "../../components/landingPage/FQA.vue";
import Benefits from "../../components/landingPage/Benefits.vue";
import OurParents from "../../components/landingPage/OurParents.vue";
import Options from "../../components/landingPage/Options.vue";
import Programs from "../../components/landingPage/Programs.vue";
import Workshop from "../../components/landingPage/Workshop.vue";
import Certificate from "../../components/landingPage/Certificate.vue";
import PersonalizedLearning from "../../components/landingPage/PersonalizedLearning.vue";
</script>
<template>
  <main>
      <Navbar class="nav" :selected="0"/>
      <Options/>
      <HeroSection />
      <Programs/>
      <Workshop/>
      <PersonalizedLearning/>
      <Certificate/>
      <AboutUs />
      <Benefits />
      <OurParents />
      <FQA />
  </main>
</template>

<style scoped>
.nav {
  top: 0;
  position: sticky;
}

</style>
