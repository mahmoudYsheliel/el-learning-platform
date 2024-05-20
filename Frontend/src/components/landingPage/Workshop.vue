<script lang="ts" setup>
import Button from "primevue/button";
</script>

<template>
  <main>
    <div class="container">
      <img
        style="position: absolute; right: 0"
        src="../../assets/StarFour.svg"
        alt=""
      />
      <div class="circle"></div>
      <h1>Attend workshops by</h1>
      <h1>Trace Education</h1>
      <p>
        Trace is proudly accredited by STEM.org that provides STEM courses; from
        the age of four till the age of eighteen years old. Exclusively in
        Egypt, Trace is empowered by Engineering for kids.
      </p>
      <Button label="Book Workshop" />
    </div>
    <img class="image" src="../../assets/workshop.png" alt="" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  padding: 6rem;
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
@media screen and (max-width: 1200px) {
  .image {
    width: 40%;
    height: fit-content;
  }
}
</style>
