<script lang="ts" setup>
import Button from "primevue/button";
import "primeicons/primeicons.css";
import { useRouter } from "vue-router";
import { selectLang, translationModule } from "@/lib/Translate";

const router = useRouter();
</script>
<template>
  <main>
    
    <div class="wrapper">
     
      <div class="container">
        <h1>
          <span>{{ selectLang(translationModule.upSkills) }}</span>
          <img
        class="imagenormal imageflip"
        src="/images/Circles.svg"
        alt="Sparkle SVG"
      />
          <img
            style="width: 2rem; margin-inline: 2rem; display: inline-block;"
            src="/images/StarFour.svg"
            alt="Sparkle SVG"
          />
          <br />
          {{ selectLang(translationModule.advanceCareer) }}
          <br />
          {{ selectLang(translationModule.path) }}
        </h1>
        <p>
          {{ selectLang(translationModule.traceDescription) }}
        </p>
        <div class="buttonWrapper">
          <Button
            :label="selectLang(translationModule.startFree)"
            @click="router.push('/freeCourses')"
          />
          <p style="color: var(--accent1); margin: 0">
            {{ selectLang(translationModule.noCreditCard) }}
          </p>
        </div>
      </div>

      <img src="/images/heroimage.png" alt="" />
    </div>
  </main>
</template>

<style scoped>
.no-svg .logo {
  width: 99px;
  height: 99px;
}
main {
  background-color: var(--primarry);
  padding-block: 4rem;
  position: relative;
}
.wrapper {
 
  width: 90%;
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-inline: auto;
}
img {
  width: 38.75%;
}
.imagenormal{
  position: absolute;
   width: 25rem; 
   left: 0;
}
h1 {
  color: var(--accent1);
  text-transform: capitalize;
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 5.5rem;
  margin: 0;
}
span {
  color: var(--accent2);
}
p {
  color: var(--text);
  text-transform: capitalize;
  width: 25rem;
  margin: 0;
}
strong {
  color: var(--accent1);
}
button {
  padding: 1rem 3rem;
}
@media screen and (max-width: 1300px) {
  .wrapper {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 62%;
  }
}
</style>
