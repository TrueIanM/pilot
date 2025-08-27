<!--
  ReportComp.vue
  Displays a question review with answer, user selection, explanation, comments, and testing options
-->

<template>
  <div class="column-flex">
    <!-- Question and status section -->
    <div class="outer" :style="{ borderLeft: borderColor }">
      <div class="q-rev">
        <div class="top-column">
          <!-- Toggle explanation view -->
          <button @click="toggleExplanation" class="icon-button">
            <font-awesome-icon icon="fa-solid fa-lightbulb" />
          </button>
          <!-- Toggle comments view -->
          <button @click="toggleComment" class="icon-button">
            <font-awesome-icon icon="fa-regular fa-comments" />
          </button>
        </div>
        <p class="question">
          {{ props.Question.question }}
        </p>
        <!-- Correct answer display -->
        <div class="correct-q">
          <div class="ico-div">
            <font-awesome-icon
              v-if="props.Question.isCorrect"
              icon="fa-solid fa-check"
            />
          </div>
          <p class="correct-p">{{ answer }}</p>
        </div>
        <!-- Incorrect answer display -->
        <div
          v-if="props.Question.isAttempted && !props.Question.isCorrect"
          class="incorrect-q"
        >
          <div class="ico-div">
            <font-awesome-icon icon="fa-solid fa-check" />
          </div>
          <p class="correct-p">{{ selected }}</p>
        </div>
        <!-- Not attempted display -->
        <div v-if="!props.Question.isAttempted" class="not-attempted">
          <div class="ico-div">
            <font-awesome-icon icon="fa-regular fa-circle-question" />
          </div>
          <p class="correct-p">Not Attempted</p>
        </div>
      </div>
      <!-- Radio button selection for testing preferences -->
      <div class="q-mod">
        <div class="radio">
          <div class="outer-circle" @click="switchSelection(1)">
            <div v-if="props.Question.radio" class="inner-circle"></div>
          </div>
          <div class="selLabel">Do not test</div>
        </div>
        <div class="radio">
          <div class="outer-circle" @click="switchSelection(2)">
            <div v-if="props.Question.radio1" class="inner-circle"></div>
          </div>
          <div class="selLabel">1x in next test</div>
        </div>
        <div class="radio">
          <div class="outer-circle" @click="switchSelection(3)">
            <div v-if="props.Question.radio2" class="inner-circle"></div>
          </div>
          <div class="selLabel">Keep testing</div>
        </div>
      </div>
    </div>
    <!-- Explanation or comments section -->
    <div
      class="details"
      :class="{ showDetails: showDetails, hideDetails: !showDetails }"
    >
      <ExplanationComponent v-if="isExplanation" :Question="props.Question" />
      <CommentsComponent v-else :ID="props.Question.position - 1" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useQuestionsStore } from "../stores/counter";
import CommentsComponent from "./CommentsComponent.vue";
import ExplanationComponent from "./ExplanationComponent.vue";

let store = useQuestionsStore();
const props = defineProps({ Question: Object });

// State for toggling explanation and comments view
const isExplanation = ref(true);
const showDetails = ref(false);

// Computed values for answer, selected answer, and border color
const answer = computed(() => {
  let val = "Error";
  props.Question.selections.forEach((element) => {
    if (element.isAnswer) val = element.detail;
  });
  return val;
});

const borderColor = computed(() =>
  props.Question.isCorrect
    ? "2px solid var(--correct-answer)"
    : "2px solid var(--incorrect-answer)"
);

const selected = computed(() => {
  let val = "Error";
  props.Question.selections.forEach((element) => {
    if (element.isSelected) val = element.detail;
  });
  return val;
});

// Update question feedback in store
async function handleChange(val) {
  let arr = store.exam.feedback.split(":");
  let edit = arr[props.Question.position - 1].split(",");
  arr[props.Question.position - 1] = edit[0] + "," + edit[1] + "," + val;
  let newFeedback = arr.join(":");

  await store.editExams({
    ID: store.exam.exam_id,
    questions: store.exam.feedback,
  });
  store.exam.feedback = newFeedback;
}

// Toggle explanation view
function toggleExplanation() {
  showDetails.value = !showDetails.value;
  isExplanation.value = true;
}

// Toggle comments view
function toggleComment() {
  showDetails.value = !showDetails.value;
  isExplanation.value = false;
}

// Reset all radio selections
function unSelect() {
  props.Question.radio = false;
  props.Question.radio1 = false;
  props.Question.radio2 = false;
}

// Switch radio selection and update feedback
function switchSelection(sel) {
  switch (sel) {
    case 1:
      unSelect();
      props.Question.radio = true;
      break;
    case 2:
      unSelect();
      props.Question.radio1 = true;
      break;
    case 3:
      unSelect();
      props.Question.radio2 = true;
      break;
    default:
      unSelect();
      break;
  }
  handleChange(sel);
}
</script>

<style scoped>
.details {
  transition: height 0.4s ease-in, visibilty 0.2s linear;
}
.showDetails {
  height: auto;
  visibility: visible;
}
.hideDetails {
  height: 0;
  visibility: hidden;
}
.radio {
  display: flex;
}
.check-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.625rem;
}

.question,
.correct-p {
  max-lines: 1;
}
.q-rev,
.q-mod,
.incorrect-q,
.correct-q,
.top-column,
.not-attempted,
.outer {
  display: flex;
  font-size: 0.875rem;
  margin-left: 0.625rem;
}
.q-mod {
  margin-top: 0.625rem;
  margin-right: 0.625rem;
}
.outer {
  padding: 0.625rem, 0.9735rem;
  background-color: var(--light-white);
  /*box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
  color: var(--raisin-black);
  margin: 10px 0;
}

.q-rev {
  flex-direction: column;
  flex: 6;
  gap: 6px;
}
.q-mod {
  justify-content: end;
  gap: 10px;
  flex: 4;
  flex-wrap: wrap;
}
.icon-button {
  border: none;
  background-color: transparent;
  padding: 3px 2px;
  cursor: pointer;
  color: var(--raisin-black);
}
.top-column {
  gap: 0.9375rem;
}
.incorrect-q,
.not-attempted,
.correct-q {
  gap: 0.625rem;
  align-items: center;
}
.ico-div {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  color: #fff;
}
.not-attempted,
.not-attempted svg {
  color: var(--incorrect-answer);
}
.incorrect-q .ico-div {
  background-color: var(--incorrect-answer);
}
.correct-q .ico-div {
  background-color: var(--correct-answer);
}
@media (max-width: 1250px) {
  .outer {
    flex-direction: column;
    gap: 1.25rem;
  }
  .q-mod {
    justify-content: start;
  }
}
.outer-circle {
  width: 20px;
  height: 20px;
  border: 2px solid #42b983;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.inner-circle {
  width: 10px;
  height: 10px;
  background-color: #42b983;
  border-radius: 50%;
}

.outer-circle:hover {
  border-color: #369e73;
}
</style>
