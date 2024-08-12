<script lang="ts" setup>
import "primeicons/primeicons.css";
import { selectLang,translationModule } from "@/lib/Translate";
import { achievments } from "@/lib/Modules";


</script>

<template>
  <main>
    <div class="container">
      <h1 style="color: var(--accent2)">{{ selectLang(translationModule.achievements) }}</h1>
      <h3 style="color: var(--text)">
        {{ selectLang(translationModule.achDescription) }}
      </h3>
      <div class="wrapper">
        <div class="card" v-for="achievment in achievments">
          <img
            :style="{
              padding: '1rem',
              background: achievment.color,
              height: 'fit-content',
              borderRadius: '0.5rem',
            }"
            :src="achievment.class"
            alt=""
          />
          <div class="info">
            <h2
              style="margin: '0'; padding: 0; line-height: 0; font-size: 2rem"
            >
              {{ achievment.count }}
            </h2>
            <p>{{selectLang(achievment.info) }}</p>
          </div>
        </div>
      </div>
    </div>

    <img class="image" src="/images/achievments.png" alt="" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  padding: 5rem 10rem;
  justify-content: space-between;
}
.container {
  position: relative;
}
h1 {
  width: fit-content;
  margin: 0;
  padding: 0;
  line-height: 0.5rem;
  border-bottom: 0.25rem solid var(--accent3);
}

p {
  color: var(--text);
}
button {
  padding: 1rem 3rem;
}
.wrapper {
  display: flex;
  flex-wrap: wrap;
}
.card {
  display: flex;
  gap: 1rem;
  width: 20rem;
}
@media screen and (max-width: 1450px) {
  .image {
    width: 30%;
    height: fit-content;
  }
  .container {
    width: 60%;
  }
  main {
    padding-inline: 5rem;
  }
}
@media screen and (max-width: 1050px) {
  .image {
    display: none;
  }
  .container {
    width: 90%;
  }
}
</style>
