<script lang="ts" setup>
import ChildSidebar from "../../components/general/ChildSidebar.vue";
import Navbar from "../../components/general/Navbar.vue";
import Footer from "@/components/general/Footer.vue";
import { HttpRequester } from "@/lib/APICaller";
import Button from "primevue/button";
import { usePersonalInfo } from "@/stores/token";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router =useRouter()

const personalInfo = usePersonalInfo()

</script>

<template>
  <Navbar />
  <div class="container">
    <ChildSidebar class="sidebar" selected="Notifications" />
    <div class="wrapper">


      <div class="requests">
        <h2>Notifications</h2>
        <div class="table-container">
          <div class="row head">
            <h3>Title</h3>
            <h3>Type</h3>
            <h3>Status</h3>
            <h3>Action</h3>
          </div>
          <div class="row" v-for="(not, i) in personalInfo.getInfo?.notifications">
            <span>{{ not.title }}</span>
            <span>{{ not.type }}</span>
            <span :class="{waiting:not.status=='waiting', done:not.status=='done'}">{{ not?.status }}</span>
            <span>
              <Button
                @click="router.push(`/analysisQuiz/${not.analysis_quiz_id}`)"
                v-if="not.type=='analysis quiz'"
                :disabled="not.status=='done'"
                style="font-size: 0.75rem"
                label="Start Test"
            /></span>
          </div>
        </div>
      </div>

    </div>
  </div>
  <Footer />
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 12rem calc(100vw - 15rem);
  min-height: 100vh;
}
.wrapper {
  padding: 2rem;
}

.row {
  display: grid;
  grid-template-columns: 20rem 8rem 8rem 8rem;
}
h3 {
  margin: 0;
}
.row > * {
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  border: 2px solid var(--choiceBackgroundColor);
}
.wrapper {
  margin-top: 2rem;
  margin-left: 2rem;
}
h2 {
  color: var(--accent1);
  width: fit-content;
  line-height: 1rem;
  border-bottom: 0.25rem solid var(--accent3);
}
.requests {
  width: 90%;
}
.table-container {
  padding-left: 1rem;
  overflow-x: scroll;
  max-width: 100%;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  
}
.table-container::-webkit-scrollbar {
  display: none;
}
h3 {
  color: var(--text);
}
span {
  color: var(--accent2);
}
.waiting {
  color: var(--secondary );
}
.done {
  color: var(--correctAnswer);
}
.msg-wrapper {
  display: flex;
  flex-direction: column;
}
.add-comment {
  margin-inline: auto;
  margin-top: 2rem;
  width: fit-content;
  display: flex;
  gap: 1rem;
}
@media screen and (max-width: 1000px) {
  .container {
  grid-template-columns:  90vw;
  min-height: 100vh;
}
.sidebar{
  display: none;
}
}
</style>
