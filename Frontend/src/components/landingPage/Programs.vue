<script lang="ts" setup>
import "primeicons/primeicons.css";

const programs = [
  {
    name: "Discovery Zone",
    age: "6-9 Years",
    description: "Lessons on design that cover the most recent developments.",
    color: "var(--accent1)",
  },
  {
    name: "Pathfinder",
    age: "10-13 Years",
    description: "Lessons on design that cover the most recent developments.",
    color: "var(--accent3)",
  },
  {
    name: "Master",
    age: "14-18 Years",
    description: "Lessons on design that cover the most recent developments.",
    color: "var(--accent2)",
  },
];
</script>

<template>
  <main>
    <h1 class="header">Trace Programs</h1>
    <p class="header">Where Entertainment meets Education</p>
    <div class="wrapper">
      <div class="left">
        <img src="../../assets/circleSparkleGroup.svg" alt="">
      </div>
      <div class="content">
        <div
          class="card"
          v-for="program in programs"
          :style="{ backgroundColor: program.color }"
        >
          <div class="top">
            <img src="../../assets/openBook.svg" style="width: 3rem" alt="" />
            <div class="name-age">
              <p>{{ program.name }}</p>
              <p>{{ program.age }}</p>
            </div>
          </div>
          <p>{{ program.description }}</p>
          <p style="margin: 0;">Learn More <i class="pi pi-angle-right"></i></p>
        </div>
      </div>
      <div class="rignt">
        <img src="../../assets/Arrow 07.svg"  alt="" />
      </div>
    </div>
  </main>
</template>

<style scoped>
main{
    margin-block:7.5rem ;
}
.header {
  text-align: center;
  color: var(--accent1);
  margin: 0;
  padding: 0;
}
h1 {
  line-height: 2rem;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3rem;
}
p.header {
  color: var(--text);
}
.content {
  width: 62.5%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
  flex-wrap: wrap;
}
.card {
  width: 18rem;
  color: var(--primary);
  border-radius: 8px;
  padding: 1.5rem 2rem ;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.top {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.name-age>*{
    margin: 0;
    padding: 0;
    line-height: 1rem;
}
.name-age{
    
    display: flex;
    flex-direction: column;
    gap:0.5rem;
}
p{
    margin: 0;
    padding: 0;
    line-height: 1.5rem;
}
</style>
