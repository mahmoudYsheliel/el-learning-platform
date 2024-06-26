<script setup lang="ts">
import Navbar from "../../components/general/Navbar.vue";
import HeroSection from "../../components/landingPage/HeroSection.vue";
import Options from "../../components/general/Options.vue";
import Programs from "../../components/landingPage/Programs.vue";
import Workshop from "../../components/landingPage/Workshop.vue";
import Certificate from "../../components/landingPage/Certificate.vue";
import PersonalizedLearning from "../../components/landingPage/PersonalizedLearning.vue";
import Achievement from "../../components/landingPage/Achievement.vue";
import Footer from "../../components/general/Footer.vue";
import { ref,watch } from "vue";
import { useElementVisibility } from "@vueuse/core";



const home = ref(null)
const courses = ref(null)
const about = ref(null)
const contact = ref(null)

const homeIsVisible = useElementVisibility(home)
const coursesIsVisible = useElementVisibility(courses)
const aboutIsVisible = useElementVisibility(about)
const contactIsVisible = useElementVisibility(contact)

const selected = ref(0)
watch([homeIsVisible,coursesIsVisible,aboutIsVisible,contactIsVisible],()=>{
  if(homeIsVisible.value){
    selected.value= 0
  }
  else if(coursesIsVisible.value){
    selected.value=1
  }
  else if(aboutIsVisible.value){
    selected.value= 2
  }
  else if(contactIsVisible.value){
    selected.value=3
  }
})



</script>
<template>
  <main>
    <Navbar class="nav" :selected="selected" />
    <Options id="Home" />
    <HeroSection ref="home"/>
    <Programs id="Courses" ref="courses"/>
    <Workshop />
    <Certificate  />
    <Achievement id="About" ref="about"/>
    <PersonalizedLearning />
    <Footer id="Contact" ref="contact"/>
  </main>
</template>

<style scoped>
.nav {
  top: 0;
  position: sticky;
}
</style>
