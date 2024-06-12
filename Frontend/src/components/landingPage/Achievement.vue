<script lang="ts" setup>
import "primeicons/primeicons.css";

const achievments = [
  {
    class: "./src/assets/GraduationCap.svg",
    info: "Instructor",
    count: 100,
    color: "#E9F8F3",
  },
  {
    class: "./src/assets/VideoCamera.svg",
    info: "Video",
    count: 1000,
    color: "#FFFAF5",
  },
  {
    class: "./src/assets/GraduationCap.svg",
    info: "Student",
    count: 2000,
    color: "#FFEEF0",
  },
  {
    class: "./src/assets/UsersThree.svg",
    info: "Users",
    count: 10000,
    color: "#F0F7FF",
  },
];
</script>

<template>
  <main>
    <div class="container">
      <h1>Our <span style="color: var(--accent2)">Achievements</span></h1>
      <h3 style="color: var(--text)">
        Various versions have evolved over the years, sometimes by accident,
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
            <h2 style="margin: '0';padding: 0;line-height: 0; font-size: 2rem;">{{ achievment.count }}</h2>
            <p>{{ achievment.info }}</p>
          </div>
        </div>
      </div>
    </div>

    <img class="image" src="../../assets/achievments.png" alt="" />
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
  .container{
    width: 60%;
  }
  main{
    padding-inline: 2rem;
  }
}
@media screen and (max-width: 1050px) {
  .image{
    display: none;
  }
  .container{
    width: 90%;
  }
}
</style>
