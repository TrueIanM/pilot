<!--
  NavigationButton.vue
  Displays a question navigation button with state-based styling
-->

<template>
  <!-- Button reflects question status: current, correct, incorrect, or test mode -->
  <button
    class="nav_button"
    :class="{
      current:
        questionStore.exam.current_question == pros.Question.position - 1,
      correct:
        !questionStore.exam.isTestMode &&
        pros.Question.isAttempted &&
        pros.Question.isCorrect,
      incorrect:
        !questionStore.exam.isTestMode &&
        pros.Question.isAttempted &&
        !pros.Question.isCorrect,
      test: pros.Question.isAttempted && questionStore.exam.isTestMode,
    }"
  >
    {{ pros.Question.position }}
    <!-- Show pin icon if question is marked -->
    <div v-if="pros.Question.isMarked" class="mark">
      <font-awesome-icon icon="fa-solid fa-thumbtack" />
    </div>
  </button>
</template>

<script setup>
// Import store to access exam state
import { useQuestionsStore } from "../stores/counter";

// Props for the current question
const pros = defineProps({
  Question: Object,
});

let questionStore = useQuestionsStore();
</script>

<style scoped>
.nav_button {
  color: var(--visible-gray);
  background-color: var(--light-white);
  border-top: var(--main-backgound) 1px solid;
  border-left: var(---main-backgound) 1px solid;
  border-right: var(---main-backgound) 1px solid;
  border-bottom: rgb(209, 209, 209) 1px solid;
  cursor: pointer;
  display: flex;
  width: 30px;
  height: 22px;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  position: relative;
}
.nav_button:hover {
  border: var(--raisin-black) 1px solid;
}
.current {
  border: var(--color-heading) 1px solid;
}
.mark {
  position: absolute;
  width: var(--mark-container);
  height: var(--mark-container);
  top: -4px;
  right: -4px;
  transform: rotate(45deg);
  font-size: 8px;
  color: #fff;
  background-color: var(--visible-gray);
}
.correct {
  background-color: var(--correct-answer);
  color: var(--light-white);
}
.incorrect {
  background-color: var(--incorrect-answer);
  color: var(--light-white);
}
.test {
  background-color: var(--indigo);
  color: var(--light-white);
}
</style>
