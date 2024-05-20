<script lang="ts" setup>
const benefits = [
  {
    benefit: "Personalized Learning Journeys",
    image: "src/assets/prsonalized.png",
  },
  {
    benefit: "Interactive and Engaging Activities",
    image: "src/assets/interactive.jpg",
  },
  {
    benefit: "Instant Feedback and Progress Tracking",
    image: "src/assets/progress.jpg",
  },
];
</script>
<template>
  <main>
    <h1>Grow with AI</h1>
    <div class="container">
      <div v-for="benefit in benefits" class="card">
        <h2>{{ benefit.benefit }}</h2>
        <img :src="benefit.image" alt="" />
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
  gap: 12px;
  text-align: center;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 8px;
  color: var(--text);
}
img {
  width: 80%;
  aspect-ratio: 1/0.5;
  border-radius: 8px;
}

@media screen and (max-width: 1000px) {
  .container {
    align-items: center;
    flex-direction: column;
    gap: 12px;
  }
  .card {
    width: 61.75%;
  }
}
</style>
