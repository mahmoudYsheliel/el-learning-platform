<script lang="ts" setup>
import Button from "primevue/button";
</script>

<template>
  <main>
    <img class="image" src="../../assets/certificate.png" alt="" />
    <div class="container">
      <img
      class="sparkle"
        style="position: absolute; left: -25%"
        src="../../assets/StarFour.svg"
        alt=""
      />
      <img
      class="sparkle"
        style="position: absolute; left: -30%; bottom: 0"
        src="../../assets/Sparkle.svg"
        alt=""
      />
      <h1>Earn your certificate By</h1>
      <h1>Trace Education</h1>
      <p>
        Trace is proudly accredited by STEM.org that provides STEM courses; from
        the age of four till the age of eighteen years old. Exclusively in
        Egypt, Trace is empowered by Engineering for kids.
      </p>
      <Button label="Join Us" />
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
