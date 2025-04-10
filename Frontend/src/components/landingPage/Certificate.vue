<script lang="ts" setup>
import Button from "primevue/button";
import { selectLang,translationModule } from "@/lib/Translate";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { HttpRequester } from "@/lib/APICaller";

const router = useRouter();

const items = ref<any[]>([]);
const programs = ref<any[]>([]);
const programRequester = new HttpRequester("get_all_program");
programRequester.callApi().then((res) => {
  programs.value = res?.data?.program;
  if (programs.value) {
    for (let program of programs.value) {
      items.value.push({
        label: selectLang(program?.title),
        command: () => {
          router.push(`/programs/${program?.id}`);
        },
      });
    }
  }
});
</script>

<template>
  <main>
    <div class="container">
      <h1>{{ selectLang(translationModule.earnCer) }}</h1>
      <h1>{{ selectLang(translationModule.companyName) }}</h1>
      <p>
        {{ selectLang(translationModule.certificateDescription) }}
      </p>
      <Button :label=selectLang(translationModule.joinUs)  @click="items[0]?.command" />
    </div>
    <img class="image" src="/images/certificate.png" alt="" />
  </main>
</template>

<style scoped>
main {
  display: flex;
  padding-block: 4rem ;
  gap: 4rem;
  align-items: start;
  justify-content: space-between;
  width: 90%;
  margin-inline: auto;
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
.image {
  width: 40%;
}


@media screen and (max-width: 1300px) {
  .image {
    width: 60%;
  }
 
  main{
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
}
@media screen and (max-width: 600px) {
  .image {
    width: 80%;
  }

}
</style>
