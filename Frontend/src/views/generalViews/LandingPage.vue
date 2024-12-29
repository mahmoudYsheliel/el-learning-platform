<script setup lang="ts">
import Navbar from "../../components/general/Navbar.vue";
import HeroSection from "../../components/landingPage/HeroSection.vue";
import Options from "../../components/general/Options.vue";
import Programs from "../../components/landingPage/Programs.vue";
import Workshop from "../../components/landingPage/Workshop.vue";
import Certificate from "../../components/landingPage/Certificate.vue";
import Achievement from "../../components/landingPage/Achievement.vue";
import Footer from "../../components/general/Footer.vue";
import { ref, watch } from "vue";
import { useToken } from "@/stores/token";
import { HttpRequester } from "@/lib/APICaller";
import AskMissingPersonalInfo from "@/components/dialogs/AskMissingPersonalInfo.vue";
import { useElementVisibility } from '@vueuse/core'


const home = ref(null)
const courses = ref(null)
const about = ref(null)
const contact = ref(null)

const homeIsVisible = useElementVisibility(home)
const coursesIsVisible = useElementVisibility(courses)
const aboutIsVisible = useElementVisibility(about)
const contactIsVisible = useElementVisibility(contact)

const selected = ref(0)
watch([homeIsVisible, coursesIsVisible, aboutIsVisible, contactIsVisible], () => {
  if (homeIsVisible.value) {
    selected.value = 0
  }
  else if (coursesIsVisible.value) {
    selected.value = 1
  }
  else if (aboutIsVisible.value) {
    selected.value = 2
  }
  else if (contactIsVisible.value) {
    selected.value = 3
  }
})


const token = useToken()
const showAskInfoDialog = ref(false)
if (token.getIsAuthorized) {
  const personaRequester = new HttpRequester("personal_info")
  personaRequester.callApi().then((res) => {
    if (res?.success) {
      let info = res?.data?.info;
      if (!info?.phone_number && info?.user_type == 'Parent') {
        showAskInfoDialog.value = true
      }
    }

  });
}

</script>
<template>
  <main>

    <AskMissingPersonalInfo :show-dialog="showAskInfoDialog" @remove-dialog="showAskInfoDialog = false" />
    <Navbar class="nav" :selected="selected" />
    <div id="home" >
      <Options ref="home"/>
      <HeroSection  />
    </div>
    <Programs id="Courses" ref="courses" />
    <Workshop id="workshop"/>
    <Certificate id="certificate"/>
    <Achievement id="About" ref="about" />
    <Footer id="Contact" ref="contact" />


  </main>
</template>

<style scoped>
#home{
  background-image: linear-gradient(to top , var(--primary), var(--accent1_300));
  
}
#Courses{

}
#workshop{
  background-color: var(--accent1_100);
}
#certificate{
 
}
#About{
  background-color: var(--accent1_100);
}
</style>
