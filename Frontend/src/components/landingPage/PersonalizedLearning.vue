<script lang="ts" setup>
import Button from "primevue/button";
import { selectLang,translationModule } from "@/lib/Translate";
</script>

<template>
  <main>
    <div class="container">
     
      <h1>{{ selectLang(translationModule.personalized) }}</h1>
      <h1>
        {{ selectLang(translationModule.journey) }}
        <img
          style="position: absolute; "
          src="/images/StarFour.svg"
          alt=""
        />
      </h1>
      <p>
        {{ selectLang(translationModule.oneYear) }}
        
        <br />
       {{ selectLang(translationModule.roadMapDescription) }}
      </p>
      <Button :label=selectLang(translationModule.roadmap) />
    </div>
    <img class="image" src="/images/prsonalizedlearning.png" alt="" />
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
.circle {
  width: 2rem;
  height: 2rem;
  background-color: var(--accent2);
  position: absolute;
  right: -10%;
  bottom: 0;
  border-radius: 100%;
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
  position: relative;
  width: fit-content;
}
p {
  color: var(--text);
  width: 80%;
}
button {
  padding: 1rem 3rem;
}
.image {
  height: fit-content;
  padding: 2rem;
  border: 2px solid var(--accent1);
  border-radius: 16px;
}
@media screen and (max-width: 1300px) {
  .arrow {
    display: none;
  }
}
@media screen and (max-width: 1400px) {
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
    flex-direction: column-reverse;
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
