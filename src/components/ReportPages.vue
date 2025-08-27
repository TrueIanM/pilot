<!--
  ReportPages.vue
  Displays paginated report questions with navigation controls
-->

<template>
  <div class="content-container">
    <!-- Render current page of report questions -->
    <ReportComp v-for="question in reports" :Question="question" />

    <!-- Pagination controls -->
    <div class="page-content">
      <div class="pages">
        <!-- Jump to first page -->
        <div class="page-btn" @click="toPageOne" v-if="!leftView">
          <font-awesome-icon icon="fa-solid fa-angles-left" />
        </div>
        <!-- Previous page -->
        <div class="page-btn" @click="toPreviousPage" v-if="!leftView">
          <font-awesome-icon icon="fa-solid fa-angle-left" />
        </div>
        <!-- Page numbers -->
        <div
          v-for="pg in pages"
          class="page-btn"
          @click="currentPage = pg - 1"
          :class="{ currentpage: currentPage === pg - 1 }"
        >
          {{ pg }}
        </div>
        <!-- Next page -->
        <div class="page-btn" @click="toNextPage" v-if="!rightView">
          <font-awesome-icon icon="fa-solid fa-angle-right" />
        </div>
        <!-- Jump to last page -->
        <div class="page-btn" @click="toLastPage" v-if="!rightView">
          <font-awesome-icon icon="fa-solid fa-angles-right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuestionsStore } from "../stores/counter";
import ReportComp from "../components/ReportComp.vue";
import { computed, ref } from "vue";

let store = useQuestionsStore();

// Total pages (5 items per page)
const pages = ref(
  store.exam.questions.length === 0 ? 0 : store.exam.questions.length / 5
);

// Current page index
const currentPage = ref(0);

// Compute current page reports
const reports = computed(() =>
  store.getFiveItems(
    currentPage.value * 5,
    currentPage.value * 5 + 5 > store.exam.questions.length
      ? store.exam.questions.length
      : currentPage.value * 5 + 5
  )
);

// Disable left navigation on first page
const leftView = computed(() => currentPage.value === 0);

// Disable right navigation on last page
const rightView = computed(() => {
  if (store.exam.questions.length < 1) return false;
  return currentPage.value === Math.ceil(store.exam.questions.length / 5) - 1;
});

// Navigation functions
function toPageOne() {
  currentPage.value = 0;
}
function toLastPage() {
  currentPage.value = Math.ceil(store.exam.questions.length / 5) - 1;
}
function toNextPage() {
  currentPage.value++;
}
function toPreviousPage() {
  currentPage.value--;
}
</script>

<style scoped>
.content-container {
  width: 80%;
  margin: 20px auto;
  color: var(--raisin-black);
}
.page-content,
.pages {
  display: flex;
  flex-direction: row;
  gap: 3px;
}
.page-content {
  justify-content: center;
}
.page-btn {
  font-size: 20px;
  width: 35px;
  height: 35px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: solid 1px var(--main-backgound);
}
.page-btn:hover {
  border: solid 1px var(--color-heading);
}
.currentpage {
  border: solid 1px var(--visible-gray);
}
</style>
