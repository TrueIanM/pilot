<template>
  <div class="report-container">
    <div
      class="top-container"
      :class="{ fail: fail, pass: pass, distinction: distinction }"
    >
      <div class="title-container">
        <div class="title-column">
          <div class="title-main" @click="toExamPage">
            <font-awesome-icon icon="fa-solid fa-angle-left" />
            <h1>Grade Report</h1>
          </div>
          <div class="double-row">
            <div class="subject-title">
              <div class="sub-name">{{ store.exam.subject }}</div>
              <div class="divider"></div>
              <div class="sub-short">{{ store.exam.level }}</div>
            </div>
            <div class="details-title">
              <div class="det">{{ store.exam.date }}</div>
              <div class="divider"></div>
              <div class="det">{{ store.exam.time_taken }}</div>
              <div class="divider"></div>
              <div class="det">
                Correct {{ total }} of
                {{ store.exam.questions.length }} questions
              </div>
            </div>
          </div>
        </div>
        <div class="percentile-container" :style="{ background: progress }">
          <div
            class="circle"
            :class="{ fail: fail, pass: pass, distinction: distinction }"
          >
            <div class="percentile">
              {{ resultPercentage.toFixed(1) }}<sup>%</sup>
            </div>
            <div class="remark">{{ remark }}</div>
          </div>
        </div>
      </div>
    </div>
    <ReportPages />
  </div>
</template>

<script setup>
import ReportPages from "../components/ReportPages.vue";
import { computed, ref } from "vue";
import { useQuestionsStore } from "../stores/counter";
import router from "../router";

let store = useQuestionsStore();
const fail = ref(false),
  pass = ref(false),
  distinction = ref(false);
const remark = ref("");
const total = ref(0);

const resultPercentage = computed(() => {
  if (store.exam.questions.length == 0) return 0;
  let val = 0;
  store.exam.questions.forEach((element) => {
    if (element.isCorrect) val++;
  });
  total.value = val;
  return (val / store.exam.questions.length) * 100;
});

if (resultPercentage.value > 70) {
  distinction.value = true;
  remark.value = "Distiction";
} else if (resultPercentage.value > 40) {
  pass.value = true;
  remark.value = "Pass";
} else {
  fail.value = true;
  remark.value = "Fail";
}

const progress = computed(
  () =>
    "conic-gradient( #ffffff " +
    resultPercentage.value * 3.6 +
    "deg, #ffffff4f " +
    resultPercentage.value * 3.6 +
    "deg"
);
function toExamPage() {
  router.push({ name: "exam" });
  store.exam.isReview = true;
}
</script>

<style scoped>
.percentile-container {
  width: var(--outer-cicular);
  height: var(--outer-cicular);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 20px 0;
}

.circle {
  width: var(--cicular-progress);
  height: var(--cicular-progress);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  line-height: 1;
}

.title-container {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.title-column {
  display: flex;
  flex-direction: column;
}
.title-main {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  cursor: pointer;
}
.title-main svg {
  font-size: 35px;
}
.top-container {
  width: 100%;
  color: white;
}
.fail {
  background-color: var(--incorrect-answer);
}
.pass {
  background-color: var(--indigo);
}
.distinction {
  background-color: var(--correct-answer);
}
.subject-title,
.details-title {
  display: flex;
  gap: 5px;
}
.divider {
  background-color: #fff;
  width: 1px;
  height: 16px;
  transform: translateY(8px);
}
.percentile {
  font-size: 28px;
}
.remark {
  font-size: 20px;
}
.subject-title {
  display: flex;
}
@media (max-width: 705px) {
  .subject-title,
  .details-title {
    flex-direction: column;
    line-height: 1;
    margin-bottom: 10px;
  }
  .divider {
    display: none;
  }
  .content-container,
  .title-container {
    width: 95%;
  }
}
</style>
