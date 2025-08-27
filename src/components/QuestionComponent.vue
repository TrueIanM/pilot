<!--
  QuestionComponent.vue
  Displays a question and its multiple-choice selections
-->

<template>
  <!-- Show question text -->
  <div>
    <p class="question">{{ props.Question.question }}</p>
    <!-- Render each selection using SelectComponent -->
    <SelectComponent
      v-for="(selection, index) in props.Question.selections"
      :choice="store.choices[index]"
      :selection="selection"
      :Question="props.Question"
    >
    </SelectComponent>
  </div>
</template>

<script setup>
// Import selection component and store for tracking choices
import SelectComponent from "./SelectComponent.vue";
import { useQuestionsStore } from "../stores/counter";

const props = defineProps({
  Question: Object,
});
let store = useQuestionsStore();
</script>

<style scoped>
.question {
  margin: 15px 0 30px 0;
  color: var(--raisin-black);
}
</style>
