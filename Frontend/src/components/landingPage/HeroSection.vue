<script lang="ts" setup>
import Button from "primevue/button";
import 'primeicons/primeicons.css'
import { useRouter } from "vue-router";
const router = useRouter();
</script>
<template>
  <main>
    
    <div class="wrapper">
      <div class="container">
        <h1>
          up your <span>skills</span> 
          <img style=" position:absolute; width: 25rem;left: 0;" src="../../assets/Circles.svg" alt="Sparkle SVG">
          <img style="width: 2rem;transform: translate(5rem,-2rem);" src="../../assets/StarFour.svg" alt="Sparkle SVG">
          <br>
          to <span>advance</span> your
          <span>career</span> 
          <br>
          path
        </h1>
        <p>
          Trace delivers the most interactive way for education
as never before .We are here to boost our talent students
creativity and guide them through their interesting and 
curious journey in the world 
        </p>
        <div class="buttonWrapper">
          <Button
          label="Start For Free"
          @click="router.push('/viewCourses')"
        />
        <p style="color: var(--accent1); margin: 0;">NO CREDIT CARD REQUIRED</p>
        </div>
      
      </div>

      <img src="../../assets/heroimage.png" alt="" />
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
  padding-block: 80px;
}
.wrapper {
  width: 90%;
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-inline: auto;
}
img {
  width: 38.75%;
}

h1 {
  color: var(--accent1);
  text-transform: capitalize;
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 5.5rem;
  margin: 0;
}
span{
  color: var(--accent2);
}
p{
  color: var(--text);
  text-transform: capitalize;
  width: 25rem;
  margin: 0;
}
strong {
  color: var(--accent1);
}
button {
  padding:1rem 3rem;
}
@media screen and (max-width: 800px) {
  img {
    display: none;
  }
}
</style>
