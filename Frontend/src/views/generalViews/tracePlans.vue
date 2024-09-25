<script lang="ts" setup>
import Navbar from "@/components/general/Navbar.vue";
import Options from "@/components/general/Options.vue";
import Footer from "@/components/general/Footer.vue";
import { HttpRequester } from "@/lib/APICaller";
import { selectLang, translationModule } from "@/lib/Translate";
import PlanCard from "@/components/general/PlanCard.vue";
import { useRouter, useRoute } from "vue-router";

import { ref } from "vue";
const route = useRoute();

const selectedPlan = ref(null);
const planRequester = new HttpRequester("get_plan");
planRequester.callApi({ plan_id: route.params.selectedPlanId }).then((res) => {
  if (res?.success) {
    selectedPlan.value = res?.data?.plan;
  }
});

const allPlans = ref(null);
const allPlansRequester = new HttpRequester("get_all_plans");
allPlansRequester.callApi().then((res) => {
  if (res?.success) {
    allPlans.value = res?.data?.plans;
  }
});
</script>

<template>
  <Navbar />
  <Options />
  <div class="main-container">
    <div class="selected-plan" v-if="selectedPlan">
      <h1>{{ selectLang(translationModule.selectedPlan) }}</h1>

      <div class="card">
        <PlanCard :plan="selectedPlan" />
      </div>
    </div>

    <div class="all-plans">
      <h1>{{ selectLang(translationModule.allPlans) }}</h1>
      <div class="card" v-for="plan in allPlans">
        <PlanCard :plan="plan" />
      </div>
    </div>
  </div>

  <Footer />
</template>

<style scoped>
.main-container {
  min-height: 80vh;
  padding-inline: 5rem;
  width: 100%;
}
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 2rem 1rem;
}
.selected-plan,
.all-plans {
  padding: 2rem 1rem;
}
h1 {
  color: var(--accent2);
  width: fit-content;
  line-height: 0.5rem;
  border-bottom: solid 0.25rem var(--accent3);
}

@media screen and (max-width: 800px) {
  .selected-plan,
  .all-plans {
    padding: 1rem 0.5rem;
  }
  .card {
    padding: 1rem 0.5rem;
  }
}
.main-container {
  padding-inline: 2rem;
}
</style>
