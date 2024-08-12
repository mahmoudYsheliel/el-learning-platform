<script setup lang="ts">
import "primeicons/primeicons.css";
import { selectLang, translationModule } from "@/lib/Translate";

defineProps(["title", "price", "categories", "min_age", "max_age", "duration"]);
</script>

<template>
  <main>
    <div class="container">
      <h2>{{ selectLang(translationModule.courseInfo) }}</h2>
      <div class="wrapper">
        <h4>{{ selectLang(translationModule.title) }}</h4>
        <p>{{ title }}</p>
      </div>
      <div class="wrapper">
        <h4>{{ selectLang(translationModule.categories) }}</h4>
        <p v-for="cat in categories">{{selectLang(cat.title) }}</p>
      </div>
      <div class="wrapper">
        <h4>{{ selectLang(translationModule.duration) }}<i class="pi pi-clock"></i></h4>
        <p>{{ duration }} {{ selectLang(translationModule.days) }}</p>
      </div>
      <div class="wrapper">
        <h4>{{ selectLang(translationModule.age) }}<i class="pi pi-angle-double-up"></i></h4>
        <p>{{ min_age }} - {{ max_age }} {{ selectLang(translationModule.years) }}</p>
      </div>
      <div class="wrapper">
        <h4>{{ selectLang(translationModule.price) }}<i class="pi pi-dollar"></i></h4>
        <p>{{ price }} L.E</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  width: 61.75%;
}
.container {
  width: 100%;
  padding: 1.5rem;
  border-radius: 8px;
  color: var(--text);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  margin: 1rem;
}
h2 {
  width: fit-content;
  border-bottom: solid var(--accent3) 2px;
  padding: 0;
  line-height: 1rem;
  color: var(--accent1);
  margin-bottom: 1.5rem;
}
h4 {
  margin: 0;
  padding: 0;
  width: 5.5rem;
}
.wrapper {
  border-bottom: solid var(--primary) 1px;
  margin-bottom: 1rem;
  padding-left: 1rem;
  display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
p {
  margin: 0;
  padding: 0;
  padding-left: 1rem;
  color: var(--secondary);
}
i {
  padding-left: 0.5rem;
}
</style>
