<script lang="ts" setup>
import Button from "primevue/button";
import { selectLang,translationModule } from "@/lib/Translate";

</script>

<template>
  <main>
    <div class="container">
      
      <h1>{{ selectLang(translationModule.workshops) }}
        
      </h1>
      <h1>{{ selectLang(translationModule.companyName) }}</h1>
      <p>
      {{ selectLang(translationModule.workshopDescription) }}
      </p>
      <Button :label=selectLang(translationModule.bookWorkshop) />
    </div>
    <img
        style="display: inline;bottom:5rem;position: relative;"
        class="star"
        src="/images/StarFour.svg"
        alt=""
      />
    <img class="image" src="/images/workshop.png" alt="" />
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
  .star{
    top:0
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
  .container {
    width: 90%;
  }
}
</style>
