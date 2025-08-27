<!--
  StatsComp.vue
  Displays general and level-subject specific statistics using statItem components
-->

<template>
  <div>
    <!-- Section Title -->
    <div class="title">Statistics</div>

    <!-- General statistics card -->
    <div class="card">
      <statItem
        v-for="(val, index) in vals"
        :index="index"
        :length="vals.length"
        :details="val.details"
        :val="val.value"
      />
    </div>

    <!-- Level-Subject specific statistics card -->
    <div class="card">
      <statItem
        v-for="(val, index) in vals1"
        :index="index"
        :length="vals.length"
        :details="val.details"
        :val="val.value"
      />
    </div>
  </div>
</template>

<script setup>
import statItem from "./statItem.vue";
import { ref } from "vue";
import { useQuestionsStore } from "../stores/counter";
import { getRandomValue } from "../scripts/modes";

// Access questions store
let questionStore = useQuestionsStore();

// General statistics values
const vals = ref([
  { details: "Exams Attempted ", value: getRandomValue() },
  { details: "Exams Completed ", value: getRandomValue() },
  { details: "Exams Partially Attempted ", value: getRandomValue() },
  { details: "Average Score ", value: getRandomValue() },
]);

// Level-Subject specific statistics values
const vals1 = ref([]);
questionStore.levels.forEach((level) =>
  questionStore.subjects.forEach((subject) =>
    vals1.value.push({
      details: `${level} ${subject}`,
      value: getRandomValue(),
    })
  )
);
</script>

<style scoped>
.card {
  background-color: var(--main-backgound);
  padding: 20px;
  margin: 10px;
}
.title {
  font-size: 25px;
  margin: 0.625rem 0 0 1.25rem;
  font-weight: 700;
  letter-spacing: 1.5px;
}
</style>
