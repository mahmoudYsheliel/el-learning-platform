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
            src="/images/StarFour.svg"
            alt="Sparkle SVG"
            class="star"
          />
          <br />
          {{ selectLang(translationModule.advanceCareer) }}
      
        </h1>
        <p style="font-size: 1.25rem;font-weight: 600;">
          {{ selectLang(translationModule.traceDescription) }}
        </p>
        <div class="buttonWrapper">
          <Button
          style="font-size: 1.5rem;margin-top: 1rem;"
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
  gap: 4rem;
}
img {
  width: 38.75%;
}
.imagenormal{
  position: absolute;
   width: 25rem; 
   max-width: 100%;
   left: 0;
}
h1 {
  color: var(--accent1);
  text-transform: capitalize;
  font-size: 3.5rem;
  font-weight: bolder;
  line-height: 5.5rem;
  margin: 0;
}
span {
  color: var(--accent2);
}
p {
  color: var(--text);
  text-transform: capitalize;

  margin: 0;
}
strong {
  color: var(--accent1);
}
button {
  padding: 1rem 3rem;
}
.star{
  width: 2rem;
   margin-inline:    2rem;
    display: inline-block;
}
button{
  background-image: linear-gradient(to right , var(--accent1), var(--accent4));
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
  p{
    width: fit-content;
  }
  .star{
    display: none;
  }
  .imagenormal{
    width: 20rem;
  }
}
</style>
