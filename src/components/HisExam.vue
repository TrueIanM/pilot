<!--
  HisExam.vue
  Displays a single exam history entry with score and actions
-->

<template>
  <div class="container">
    <!-- Top row with level, subject, date, and time taken -->
    <div class="top-row">
      <div class="level-subject">{{ exam.level + " " + exam.subject }}</div>
      <div v-html="date"></div>
      <div class="time">{{ exam.time_taken }}</div>
    </div>

    <!-- Score bar visualization -->
    <div class="score-cont">
      <div class="score-out-bar">
        <div class="score-inner-bar" :style="{ width: exam_width }"></div>
      </div>
      <div class="score">{{ exam.score + "%" }}</div>
    </div>

    <!-- Action buttons for review, retry, and delete -->
    <div class="bot-row">
      <div class="action" @click="getReview">Review</div>
      <div class="action" @click="getRetry">Retry</div>
      <div @click="$emit('removeHistory', exam.ID)" class="delete">Delete</div>
    </div>
  </div>
</template>

<script setup>
import { formatDateForDisplay } from "../scripts/modes";
import { computed } from "vue";
import { useQuestionsStore } from "../stores/counter";
import router from "../router";

let store = useQuestionsStore();
const props = defineProps({ exam: Object });

// Formatted date for display
const date = computed(() => formatDateForDisplay(props.exam.exam_date));

// Score width for progress bar
const exam_width = computed(() => props.exam.score + "%");

// Navigate to review mode
async function getReview() {
  store.exam.feedback = props.exam.questions;
  store.exam.isReview = true;
  store.exam.exam_id = props.exam.ID;
  store.exam.time_taken = props.exam.time_taken;
  store.exam.progress = props.exam.progress;
  store.exam.level = props.exam.level;
  store.exam.subject = props.exam.subject;
  router.push({
    name: "exam",
  });
}

// Navigate to retry mode
async function getRetry() {
  store.exam.feedback = props.exam.questions;
  store.exam.isRetry = true;
  store.exam.level = props.exam.level;
  store.exam.subject = props.exam.subject;
  router.push({
    name: "exam",
  });
}
</script>

<style scoped>
.container {
  background-color: var(--main-backgound);
  margin: 5px 10px;
  border-left: 3px solid var(--zafre);
}
.top-row,
.bot-row {
  display: flex;
  justify-content: space-between;
  margin: 0 10px;
}
.action,
.delete {
  cursor: pointer;
  padding: 5px 10px;
}
.action:hover {
  color: var(--zafre);
}
.delete:hover {
  color: var(--incorrect-answer);
}
.bot-row {
  margin-top: 10px;
}
.score-cont {
  margin: 3px 0 3px 8px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.score-out-bar {
  width: 60%;
  background-color: var(--incorrect-answer);
  height: 10px;
}
.score-inner-bar {
  background-color: var(--correct-answer);
  height: 100%;
}
</style>
