<!--
  SelectComponent.vue
  Handles displaying and selecting an individual choice for a question
-->

<template>
  <div
    class="select"
    @click="onSelected"
    :class="{
      correct:
        !questionStore.exam.isTestMode &&
        props.Question.isAttempted &&
        props.selection.isAnswer,
      incorrect:
        !questionStore.exam.isTestMode &&
        props.selection.isSelected &&
        !props.selection.isAnswer,
      test:
        props.Question.isAttempted &&
        props.selection.isSelected &&
        questionStore.exam.isTestMode,
    }"
  >
    <!-- Display choice letter -->
    <div class="choice">{{ props.choice }}</div>
    <!-- Display choice text -->
    <p class="select-item">{{ selection.detail }}</p>
  </div>
</template>

<script setup>
import { useQuestionsStore } from "../stores/counter";
let questionStore = useQuestionsStore();

// Props for choice, selection details, and parent question
const props = defineProps({
  choice: String,
  selection: Object,
  Question: Object,
});

// Handle user selecting this option
function onSelected() {
  if (questionStore.exam.isReview) return;

  // Deselect previous options if already attempted
  if (props.Question.isAttempted) {
    props.Question.selections.forEach((element) => {
      element.isSelected = false;
    });
  } else questionStore.exam.progress++;

  // Mark this selection as chosen
  props.Question.isAttempted = props.selection.isSelected = true;
  props.Question.isCorrect = props.selection.isAnswer;
}
</script>

<style scoped>
.select {
  display: flex;
  gap: 20px;
  padding: 10px;
  align-items: center;
  margin: 10px 0;
  background-color: var(--light-white);
  cursor: pointer;
  box-shadow: var(--min-shadow);
}
.select-item {
  color: var(--raisin-black);
}
.choice {
  font-size: 32px;
  font-weight: 400;
  color: rgb(211, 211, 211);
}
.correct,
.correct .choice {
  color: var(--correct-answer);
}

.incorrect,
.incorrect .choice {
  color: var(--incorrect-answer);
}
.test,
.test .choice {
  color: var(--indigo);
}
</style>
