<script setup lang="ts">
import { selectLang, translationModule } from "@/lib/Translate";
import { iqLevels } from "@/lib/Modules";
import 'primeicons/primeicons.css'


defineProps([
  "iqScore",
  "dominantTrait",
  "personality",
  "learningStyle",
  "bestCarer",
]);
</script>

<template>
  <div class="feature-container">
    <div class="feature">
      <p>{{ selectLang(translationModule.yourChildIQ) }}</p>
      <h4>
        {{ iqScore?.score }} ({{
          selectLang(
            iqLevels[
              Math.floor(
                (5 * (iqScore?.score - iqScore?.global_min)) /
                  (iqScore?.global_max - iqScore?.global_min + 1)
              )
            ]
          )
        }})
      </h4>
    </div>
    <div class="feature">
      <p>{{ selectLang(translationModule.dominantTrait) }}:</p>
      <h4>{{ selectLang(dominantTrait?.title) }}</h4>
    </div>
    <div class="feature">
      <p>{{ selectLang(translationModule.bestDescription) }}:</p>
      <h4>{{ selectLang(personality?.title) }}</h4>
    </div>
    <div class="feature">
      <p>{{ selectLang(translationModule.learningStyle) }}:</p>
      <h4>{{ selectLang(learningStyle?.title) }}</h4>
    </div>
    <div class="feature">
      <p>{{ selectLang(translationModule.recommendedCareer) }}:</p>
      <h4>{{ selectLang(bestCarer?.title) }}</h4>
    </div>
  </div>
</template>

<style scoped>
.feature-container{
    padding-inline: 2rem;
}
.feature {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    border-radius: 1rem;
    padding: 1rem;
    margin: 1rem;
    width: 50%;
    min-width: 20rem
}
.feature > :first-child {
  color: var(--text);
  font-size: 1rem;
  margin: 0.5rem;
}
.feature > :last-child {
  color: var(--accent1);
  font-size: 2rem;
  padding-inline: 2rem;
  margin: 1rem;
}
</style>
