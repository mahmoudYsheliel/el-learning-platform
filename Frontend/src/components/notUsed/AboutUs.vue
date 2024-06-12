<script lang="ts" setup></script>
<template>
  <main>
    <div class="container">
      <h1>About Us</h1>
      <p>
        Empower your passion for technology with [Platform Name]! We're an
        innovative e-learning platform designed to equip secondary school
        students with the in-demandtech skills they need to thrive in the
        rapidly evolving digital world.
      </p>
      <h2>Our Story</h2>
      <p>
        Founded by a team of passionate educators and industry experts,
        [Platform Name] was born from a shared vision: to create a fun,
        engaging, and accessible learning experience that ignites a lifelong
        love of technology in young minds.
      </p>
    </div>

    <img src="../../assets/Screenshot from 2024-03-05 21-12-18 1.png" alt="" />
  </main>
</template>

<style scoped>
main {
  background-color: var(--secondary);
  padding-block: 80px;
  display: flex;
  align-items: start;
  padding-inline: 5%;
  gap: 5%;
  color: var(--text);
}
img {
  width: 35%;
  aspect-ratio: 1.1/1;
}
h1 {
  color: var(--accent1);
  font-size: 3rem;
  padding-bottom: 1rem;
}
h2 {
  padding-top: 2rem;
  padding-bottom: 1rem;
}
</style>
