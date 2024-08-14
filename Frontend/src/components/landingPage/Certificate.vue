<script lang="ts" setup>
import Button from "primevue/button";
import { selectLang,translationModule } from "@/lib/Translate";

</script>

<template>
  <main>
    <img class="image" src="/images/certificate.png" alt="" />
    <div class="container">
      <img
        class="sparkle"
        style="position: absolute; left: -25%"
        src="/images/StarFour.svg"
        alt=""
      />
      <img
        class="sparkle"
        style="position: absolute; left: -30%; bottom: 0"
        src="/images/Sparkle.svg"
        alt=""
      />
      <h1>{{ selectLang(translationModule.earnCer) }}</h1>
      <h1>{{ selectLang(translationModule.companyName) }}</h1>
      <p>
        {{ selectLang(translationModule.certificateDescription) }}
      </p>
      <Button :label=selectLang(translationModule.joinUs) />
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  padding: 5rem 10rem;
  justify-content: space-between;
}
.container {
  width: 50%;
  position: relative;
}

h1 {
  margin: 0;
  line-height: 3rem;
}
h1:first-of-type {
  color: var(--accent1);
}
h1:last-of-type {
  color: var(--accent2);
}
p {
  color: var(--text);
}
button {
  padding: 1rem 3rem;
}
image {
  height: fit-content;
}
@media screen and (max-width: 1400px) {
  .image {
    width: 30%;
    height: fit-content;
  }
  .container {
    width: 60%;
  }
  main {
    padding-inline: 2rem;
  }
}
@media screen and (max-width: 600px) {
  .image {
    width: 62%;
  }
 
  main{
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
}
@media screen and (max-width: 1800px) {
  .sparkle {
    display: none;
  }
}
</style>
