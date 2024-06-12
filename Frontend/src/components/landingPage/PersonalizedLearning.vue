<script lang="ts" setup>
import Button from "primevue/button";
</script>

<template>
  <main>
    <div class="container">
      <img style="position: absolute;right: 0; bottom: 50%; transform: translate(120%,0); scale: 1.2;" src="../../assets/Arrow 07.svg" alt="" class="arrow">
      <h1>Personalized Learning</h1>
      <h1>Journey! <img
        style="position: absolute; right: -100%"
        src="../../assets/StarFour.svg"
        alt=""
      /></h1>
      <p>
        One Year Road Map
        <br>
As we believe in the importance of providing adequate knowledge
for each learner, we have created a dedicated program roadmap
for each learner that is based on the learners’ answers to their
online questionnaire designed by our experienced psychologists.
      </p>
      <Button label="See Roadmap" />
    </div>
    <img class="image" src="../../assets/prsonalizedlearning.png" alt="" />
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
  
  .container{
    width: 60%;
  }
  main{
    padding-inline: 2rem;
  }
}
@media screen and (max-width: 600px) {
  .image{
    display: none;
  }
  .container{
    width: 90%;
  }
}
@media screen  and (max-width: 1800px) {
  .sparkle{
    display: none;
  }
}
</style>
