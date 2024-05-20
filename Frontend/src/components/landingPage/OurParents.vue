<script lang="ts" setup>
const customers = [
  {
    image: "/src/assets/user.png",
    name: "Elon Mask",
    review:
      "I recently started using Trace to learn more about coding and web development, and I've been thoroughly impressed! As a high school  student with no prior experience",
  },
  {
    image: "/src/assets/user.png",
    name: "Elon Mask",
    review:
      "I recently started using Trace to learn more about coding and web development, and I've been thoroughly impressed! As a high school  student with no prior experience",
  },
  {
    image: "/src/assets/user.png",
    name: "Elon Mask",
    review:
      "I recently started using Trace to learn more about coding and web development, and I've been thoroughly impressed! As a high school  student with no prior experience",
  },
];
</script>
<template>
  <main>
    <h1>Our Parents Trust Us</h1>
    <div class="container">
      <div v-for="customer in customers" class="card">
        <img :src="customer.image" alt="" />
        <h3>{{ customer.name }}</h3>
        <p>{{ customer.review }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: var(--secondary);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 80px;
  gap: 24px;
}
h1 {
  color: var(--accent1);
  font-size: 3rem;
  margin-bottom: 1rem;
}
.container {
  width: 90%;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
}
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
  gap: 2rem;
  text-align: center;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding-inline: 8px;

  padding-top: calc(1rem + 0.5 * 6.75vw);
  padding-bottom: 1rem;
  color: var(--text);
  position: relative;
  margin-top: 4rem;
  margin-bottom: 2rem;
}

img {
  width: 25%; /* 0.9*0.3*0.25=0.0675 */
  aspect-ratio: 1/1;
  border-radius: 50%;
  position: absolute;
  top: 0;
  transform: translateY(-50%);
  left: 12.5;
}

@media screen and (max-width: 1000px) {
  .container {
    align-items: center;
    flex-direction: column;
    gap: 12px;
  }
  .card {
    width: 61.75%;
    padding-top: 8vw;
  }
}
</style>
