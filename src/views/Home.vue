<template>
  <div class="container" ref="questionContainer">
    <div :class="{ close: !navPane, open: navPane }" class="navigation_panel">
      <button class="cancel" @click="toHome">CANCEL TEST</button>
      <button class="finish" @click="toGradeReport">{{ report }}</button>
      <div class="grid-buttons">
        <NavigationButton
          v-for="(question, index) in questionStore.exam.questions"
          :Question="question"
          @click="changeByGrid(index)"
        />
      </div>
    </div>
    <div class="center" :class="{ close: !contentPane }">
      <div class="content_header">
        <div class="left-buttons">
          <button
            class="arrow-pos"
            @click="prev"
            :disabled="questionStore.exam.current_question == 0"
          >
            <font-awesome-icon icon="fa-solid fa-angle-left" />
          </button>

          <button
            class="arrow-pos"
            @click="next"
            :disabled="
              questionStore.exam.current_question + 1 ==
              questionStore.exam.questions.length
            "
          >
            <font-awesome-icon icon="fa-solid fa-angle-right" />
          </button>
        </div>
        <div class="right-buttons">
          <div v-if="questionStore.exam.isReview" class="time">
            {{ questionStore.exam.time_taken }}
          </div>
          <div v-else class="time">
            {{ formattedTime }}
          </div>
          <button
            v-if="questionStore.exam.questions.length > 0"
            class="mark"
            @click="
              questionStore.exam.questions[
                questionStore.exam.current_question
              ].isMarked =
                !questionStore.exam.questions[
                  questionStore.exam.current_question
                ].isMarked
            "
            :class="{
              marked:
                questionStore.exam.questions[
                  questionStore.exam.current_question
                ].isMarked
            }"
          >
            <font-awesome-icon icon="fa-solid fa-thumbtack" />
          </button>
          <div class="current-question">
            Q {{ questionStore.exam.current_question + 1 }} /
            {{ questionStore.exam.questions.length }}
          </div>
        </div>
      </div>
      <div class="content_bar">
        <div class="progress" :style="{ width: progressWidth }"></div>
      </div>
      <div class="tabs">
        <div class="tab" @click="switchTab(0)" :class="{ active: tabQuestion }">
          <font-awesome-icon icon="fa-solid fa-play" />
          Question
        </div>
        <div
          class="tab"
          @click="switchTab(1)"
          :class="{ active: tabAttachments }"
        >
          <font-awesome-icon icon="fa-solid fa-diagram-project" />
          Attachment
        </div>
        <div
          class="tab"
          @click="switchTab(2)"
          :class="{
            active: tabExplanation,
            tooltip: questionStore.exam.isTestMode
          }"
        >
          <span v-if="questionStore.exam.isTestMode" class="tooltiptext"
            >Not Available During Test</span
          >
          <font-awesome-icon icon="fa-regular fa-clipboard" />
          Explanation
        </div>
        <div
          class="tab"
          @click="switchTab(3)"
          :class="{
            active: tabComments,
            tooltip: questionStore.exam.isTestMode
          }"
        >
          <span v-if="questionStore.exam.isTestMode" class="tooltiptext"
            >Not Available During Test</span
          >

          <div class="comm">
            <font-awesome-icon icon="fa-regular fa-comments" />
            <h6 class="badge">
              {{ commentsCount }}
            </h6>
          </div>
          Comments
        </div>
      </div>

      <div class="content_component">
        <div v-if="questionStore.exam.questions.length == 0" class="skeleton">
          <div class="skeleton-paragraph"></div>
          <div class="skeleton-paragraph"></div>
          <div class="skeleton-paragraph"></div>
          <div class="skeleton-paragraph"></div>
          <div class="skeleton-paragraph"></div>
        </div>
        <component
          v-else
          :is="currentTab"
          :Question="
            questionStore.exam.questions[questionStore.exam.current_question]
          "
        />
      </div>
    </div>
  </div>
  <div class="floating-button">
    <button class="action-button" @click="switchView">
      <font-awesome-icon icon="fa-solid fa-table-cells" />
    </button>
  </div>
  <div class="dialog" :class="{ close: showDialog, open: !showDialog }">
    <div class="centredmessage">
      <div class="top">
        <font-awesome-icon class="icon" icon="fa-solid fa-exclamation-circle" />
        <p class="message">
          Please Complete all Questions you have only Attempted
          <strong>{{ questionStore.exam.progress }}</strong> out of
          <strong>{{ questionStore.exam.questions.length }}</strong>
        </p>
      </div>
      <div class="dialog-button">
        <button @click="toResults">Results</button>
        <button @click="showDialog = true">Ok</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavigationButton from "../components/NavigationButton.vue";
import QuestionComponent from "../components/QuestionComponent.vue";
import ExplanationComponent from "../components/ExplanationComponent.vue";
import CommentsComponent from "../components/CommentsComponent.vue";
import AttachmentComp from "../components/AttachmentComp.vue";
import { useQuestionsStore } from "../stores/counter";
import { onBeforeMount, ref, computed, onBeforeUnmount, watch } from "vue";
import router from "../router/index";
import { getCurrentTime } from "../scripts/modes";

const tabQuestion = ref(true);
const tabExplanation = ref(false);
const tabComments = ref(false);
const tabAttachments = ref(false);
const alltabs = ref([tabQuestion, tabAttachments, tabExplanation, tabComments]);
let currentTab = QuestionComponent;
let questionStore = useQuestionsStore();
const showDialog = ref(true);
const questionContainer = ref(null);
const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);
let interval = null;
const report = ref("");

function updateTimer() {
  seconds.value += 1;
  if (seconds.value === 60) {
    seconds.value = 0;
    minutes.value += 1;
  }
  if (minutes.value === 60) {
    minutes.value = 0;
    hours.value += 1;
  }
}

onBeforeMount(async () => {
  if (questionStore.exam.level == "" || questionStore.exam.subject == "") {
    router.push({ path: "/" });
    return;
  }
  questionStore.exam.questions = [];

  if (questionStore.exam.isReview) {
    await questionStore.getSelectExams({
      exams: questionStore.exam.feedback,
      op: 0
    });
    questionStore.exam.isTestMode = false;
    report.value = "REPORT";
    return;
  }
  if (questionStore.exam.isRetry) {
    await questionStore.getSelectExams({
      exams: questionStore.exam.feedback,
      op: 1
    });
    questionStore.exam.isTestMode = true;
    report.value = "FINISH TEST";
    return;
  }
  report.value = "FINISH TEST";
  let obj = {
    level: questionStore.exam.level,
    subject: questionStore.exam.subject
  };
  questionStore.exam.isTestMode = true;
  await questionStore.getExamQuestions(obj);
});
const formattedTime = computed(() => {
  return `${String(hours.value).padStart(2, "0")}:${String(
    minutes.value
  ).padStart(2, "0")}:${String(seconds.value).padStart(2, "0")}`;
});
const commentsCount = computed(() =>
  questionStore.getCommentsCount(questionStore.exam.current_question)
);
function startTimer() {
  if (!interval) {
    interval = setInterval(updateTimer, 1000);
  }
}

watch(
  () => questionStore.exam.questions.length,
  (count) => {
    if (count > 0 && !questionStore.exam.isReview) startTimer();
  }
);
function toHome() {
  router.push({ path: "/" });
}

const progressWidth = computed(
  () =>
    (questionStore.exam.progress / questionStore.exam.questions.length) * 100 +
    "%"
);

const navPane = ref(true);
const contentPane = ref(true);

if (window.innerWidth <= 800) navPane.value = false;

function showHideNavPane() {
  if (window.innerWidth <= 800) {
    if (navPane.value == contentPane.value) navPane.value = false;
  } else navPane.value = contentPane.value = true;
}

window.addEventListener("resize", showHideNavPane);

function keyNavigation(event) {
  if (!tabQuestion.value) return;
  switch (event.key) {
    case "ArrowUp":
      if (questionStore.exam.current_question - 5 > -1)
        questionStore.exam.current_question -= 5;

      break;
    case "ArrowLeft":
      if (questionStore.exam.current_question - 1 > -1)
        questionStore.exam.current_question -= 1;

      break;
    case "ArrowRight":
      if (
        questionStore.exam.current_question + 1 <
        questionStore.exam.questions.length
      )
        questionStore.exam.current_question += 1;

      break;
    case "ArrowDown":
      if (
        questionStore.exam.current_question + 5 <
        questionStore.exam.questions.length
      )
        questionStore.exam.current_question += 5;
  }
  event.preventDefault();
}

window.addEventListener("keydown", keyNavigation);

onBeforeUnmount(() => {
  window.removeEventListener("keydown", keyNavigation);
  window.removeEventListener("resize", showHideNavPane);
  questionStore.exam.isRetry = false;
  questionStore.exam.isReview = false;
  questionStore.exam.progress = 0;
  clearInterval(interval);
});

function switchView() {
  navPane.value = !navPane.value;
  contentPane.value = !contentPane.value;
}
function changeByGrid(index) {
  questionStore.exam.current_question = index;
  if (window.innerWidth <= 800) switchView();
}
function toGradeReport() {
  if (questionStore.exam.isReview) {
    toResults();
    return;
  }
  if (questionStore.exam.progress === questionStore.exam.questions.length)
    toResults();
  else showDialog.value = false;
}
function toResults() {
  if (!questionStore.exam.isReview)
    questionStore.exam.time_taken = formattedTime.value;
  if (questionStore.user.isLoggedIn) {
    if (!questionStore.exam.isReview) questionStore.saveExam(saveExam());
  }
  router.push({ name: "report" });
}

function switchTab(position) {
  if (position > 1 && questionStore.exam.isTestMode) return;
  alltabs.value.forEach((item) => (item.value = false));

  alltabs.value[position].value = true;

  switch (position) {
    case 0:
    default:
      currentTab = QuestionComponent;
      break;
    case 1:
      currentTab = AttachmentComp;
      break;
    case 2:
      currentTab = ExplanationComponent;
      break;
    case 3:
      currentTab = CommentsComponent;
      break;
  }
}
function next() {
  questionStore.exam.current_question++;
}
function prev() {
  questionStore.exam.current_question--;
}
function saveExam() {
  let bind = "";
  if (!questionStore.exam.isRetry) {
    questionStore.exam.questions.forEach((element, index) => {
      let selected = "none";
      element.selections.forEach((sel) => {
        if (sel.isSelected) {
          selected = sel.val;
        }
      });
      if (index === questionStore.exam.questions.length - 1)
        bind = bind + element.uuid + "," + selected + "," + "0";
      else bind = bind + element.uuid + "," + selected + "," + "0:";
    });
    questionStore.exam.feedback = bind;
  }
  let val = 0;
  questionStore.exam.questions.forEach((element) => {
    if (element.isCorrect) val++;
  });
  let score = parseFloat(
    ((val / questionStore.exam.questions.length) * 100).toFixed(2)
  );

  let details = {
    feedback: questionStore.exam.isRetry ? questionStore.exam.feedback : bind,
    id: questionStore.user.id,
    subject: questionStore.exam.subject,
    level: questionStore.exam.level,
    date: questionStore.exam.date,
    time: getCurrentTime(),
    progress: questionStore.exam.progress,
    time_taken: questionStore.exam.time_taken,
    score: score
  };
  return details;
}
</script>

<style scoped>
.dialog-button button {
  margin-left: 10px;
  color: inherit;
  padding: 3px 10px;
  background-color: var(--light-gray);
  border: none;
  cursor: pointer;
}
.dialog {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 3;
}
.centredmessage {
  background-color: var(--main-backgound);
  padding: 16px;
}
.top {
  display: flex;
  align-items: center;
  gap: 10px;
}
.top .icon {
  font-size: 60px;
  color: var(--incorrect-answer);
}
.top p {
  max-width: 200px;
}
.dialog-button {
  display: flex;
  justify-content: end;
  margin-top: 20px;
}
.floating-button {
  position: fixed;
  bottom: 3vw;
  right: 3vw;
  display: none;
  z-index: 10;
}
.action-button {
  position: relative;
  color: var(--dark-blue);
  background-color: transparent;
  width: 45px;
  height: 45px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid var(--dark-blue);
  cursor: pointer;
}
.action-button:active {
  transform: rotateY(180deg);
  transition: transform 0.3s;
}
.left-buttons,
.right-buttons {
  display: flex;
}
.right-buttons {
  gap: 30px;
}
.left-buttons {
  position: absolute;
  left: -10%;
}
.cancel {
  border: none;
  background-color: var(--main-backgound);
  cursor: pointer;
  color: var(--incorrect-answer);
}
.finish {
  margin: 0 40px;
  font-size: 14px;
  letter-spacing: 1.5px;
  padding: 5px 0;
  border: rgb(209, 209, 209) 1px solid;
  border-radius: 3px;
  color: #1d1d1d;
}
.comm {
  position: relative;
}
.badge {
  position: absolute;
  top: -5px;
  left: -8px;
  background-color: blue;
  padding: 1px 4px;
  color: #fff;
  line-height: 100%;
  font-size: 11px;
}
.container {
  padding-top: 60px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  position: relative;
}
.navigation_panel {
  width: 20%;
  flex-direction: column;
  gap: 20px;
}
.grid-buttons {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  row-gap: 5%;
  column-gap: 5%;
  width: 65%;
  margin: 0 auto;
}
.center {
  width: 70%;
  margin-left: 10%;
}
.arrow-pos {
  font-size: 30px;
  color: gray;
  border: none;
  background-color: var(--main-backgound);
  cursor: pointer;
}
.arrow-pos:disabled {
  cursor: not-allowed;
  color: var(--light-gray);
}
.content_header {
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 30px;
  font-size: 20px;
  color: var(--visible-gray);
  position: relative;
}
.mark {
  border: none;
  background: none;
  font-size: 18px;
  color: var(--visible-gray);
  cursor: pointer;
  transform: translateY(3px) rotate(45deg);
}
.marked {
  color: var(--dark-blue);
}
.content_bar {
  margin: 3px 0 10px 0;
  width: 100%;
  height: 4px;
  background-color: rgb(209, 209, 209);
}
.tabs {
  display: flex;
  gap: 20px;
  color: var(--contrasting-gray);
}
.tab {
  margin: 10px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  letter-spacing: 0.7px;
}
.active {
  color: var(--raisin-black);
}
.progress {
  background-color: var(--zafre);
  height: 100%;
  z-index: 3;
}
@media (max-width: 800px) {
  .left-buttons {
    position: relative;
    left: 0;
  }
  .content_header {
    justify-content: space-between;
    margin: 10px 0;
  }
  .container {
    position: relative;
    width: 92%;
  }
  .navigation_panel,
  .center {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    margin-left: 0;
  }
  .navigation_panel {
    margin-top: 40px;
  }
  .floating-button {
    display: block;
  }
}
@media (max-width: 450px) {
  .tabs {
    gap: 10px;
  }
  .tab {
    margin: 10px 0;
    gap: 4px;
    letter-spacing: 0.5px;
  }
}
.tooltip {
  position: relative;
  cursor: not-allowed;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -60px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
.skeleton {
  width: 100%;
}
.skeleton .skeleton-paragraph {
  height: 50px;
  margin: 10px 0;
  background: linear-gradient(
    90deg,
    var(--main-backgound) 25%,
    var(--contrasting-gray) 50%,
    var(--main-backgound) 75%
  );
  background-size: 200% 100%;

  animation: pulse 2s infinite;
  border-radius: 5px;
}
@keyframes pulse {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
