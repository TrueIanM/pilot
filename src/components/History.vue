<!--
  History.vue
  Displays user's exam history with filtering, pagination, and actions
-->

<template>
  <div class="history-container">
    <!-- Header with title and action buttons -->
    <div class="head">
      <h1 class="title">History</h1>
      <button @click="toSelectExam" class="btn">
        <font-awesome-icon icon="fa-solid fa-plus" />
        New Exam
      </button>
      <button @click="refresh" class="btn">
        <font-awesome-icon icon="fa-solid fa-rotate" />
        Refresh
      </button>
    </div>

    <!-- Filters for level and subject -->
    <div class="selectbox">
      <div class="theme-container">
        <label for="levelSelect">Level:</label>
        <select id="levelSelect" v-model="selectedLevel" class="theme-select">
          <option v-for="level in levelsWithAll" :key="level" :value="level">
            {{ level }}
          </option>
        </select>
      </div>
      <div class="theme-container">
        <label for="subSelect">Subject</label>
        <select id="subSelect" v-model="selectedSubject" class="theme-select">
          <option
            v-for="subject in subjectsWithAll"
            :key="subject"
            :value="subject"
          >
            {{ subject }}
          </option>
        </select>
      </div>
    </div>

    <!-- Exam list or skeleton loader while loading -->
    <div class="exm-cont">
      <div v-if="loading">
        <!-- Skeleton loaders for placeholder content -->
        <div class="skeleton" v-for="n in 4" :key="n">
          <div class="top-row">
            <div class="top-item skeleton-paragraph"></div>
            <div class="top-item skeleton-paragraph"></div>
            <div class="top-item skeleton-paragraph"></div>
          </div>
          <div class="mid-row">
            <div class="mid-bar skeleton-paragraph"></div>
          </div>
          <div class="bottom-row">
            <div class="buts">Review</div>
            <div class="buts">Retry</div>
            <div class="buts">Delete</div>
          </div>
        </div>
      </div>

      <div v-else class="not-loading">
        <!-- Display message if no exams -->
        <div v-if="store.exams.length == 0" class="empty">History is Empty</div>

        <!-- Render Exam components -->
        <Exam
          v-else
          v-for="ex in store.exams"
          @remove-history="removeHistory"
          :exam="ex"
        />

        <!-- Pagination controls -->
        <div v-if="store.exams.length !== 0" class="page-content">
          <div class="pages">
            <div class="page-btn" @click="prevSet">
              <font-awesome-icon icon="fa-solid fa-angles-left" />
            </div>
            <div
              class="page-btn"
              @click="goToPage(currentPage - 1)"
              :disabled="currentPage - 1 === 0"
            >
              <font-awesome-icon icon="fa-solid fa-angle-left" />
            </div>
            <button
              v-for="pageNumber in visiblePageNumbers"
              :key="pageNumber"
              @click="goToPage(pageNumber)"
              class="page-btn"
              :class="{ active: pageNumber === currentPage }"
            >
              {{ pageNumber }}
            </button>
            <div class="page-btn" @click="goToPage(currentPage + 1)">
              <font-awesome-icon icon="fa-solid fa-angle-right" />
            </div>
            <div class="page-btn" @click="nextSet">
              <font-awesome-icon icon="fa-solid fa-angles-right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuestionsStore } from "../stores/counter";
import Exam from "../components/HisExam.vue";
import router from "../router/index";
import { ref, computed, onMounted } from "vue";

let store = useQuestionsStore();

// Pagination and filter setup
const pageSize = 5;
const itemsPerPage = ref(pageSize);
const currentPage = ref(store.currentPage);
const currentSet = ref(store.currentSet);
const totalPages = computed(() =>
  Math.ceil(store.questionsTotalCount / itemsPerPage.value)
);
const totalSets = computed(() => Math.ceil(totalPages.value / pageSize));
const visiblePageNumbers = computed(() => {
  const startPage = (currentSet.value - 1) * pageSize + 1;
  const endPage = Math.min(startPage + pageSize - 1, totalPages.value);
  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );
});

// Filters
const levelsWithAll = computed(() => ["All", ...store.levels]);
const subjectsWithAll = computed(() => ["All", ...store.subjects]);
const selectedLevel = ref("All");
const selectedSubject = ref("All");

// Loading state
const loading = ref(false);

// Fetch exam data with filters
const fetchData = async () => {
  loading.value = true;
  let obj = { start: (store.currentPage - 1) * pageSize, user: store.user.id };
  await store.getHistoryCount(obj);
  await store.getHistory(obj);
  loading.value = false;
};

// Fetch page data with optional filtering
const getPageData = async (pageNumber) => {
  loading.value = true;
  let obj = { start: (pageNumber - 1) * pageSize, user: store.user.id };
  let countChange = false;
  if (selectedLevel.value !== "All") {
    obj["level"] = selectedLevel.value;
    countChange = true;
  }
  if (selectedSubject.value !== "All") {
    obj["subject"] = selectedSubject.value;
    countChange = true;
  }
  if (countChange) await store.getHistoryCount(obj);
  await store.getHistory(obj);
  loading.value = false;
};

// Navigation and pagination functions
const goToPage = async (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    store.currentPage = page;
    await getPageData(page);
  }
};
const prevSet = () => {
  if (currentSet.value > 1) {
    currentSet.value--;
    store.currentSet = currentSet.value;
  }
};
const nextSet = () => {
  if (currentSet.value < totalSets.value) {
    currentSet.value++;
    store.currentSet = currentSet.value;
  }
};

// Remove exam history entry
async function removeHistory(id) {
  let res = await store.deleteHistory({ ID: id });
  if (res.data.success) store.exams.filter((exam) => exam.ID === id);
}

// Refresh history
const refresh = async () => await fetchData();

// Navigate to new exam selection
function toSelectExam() {
  router.push({ name: "select" });
}

// Initial fetch on mount
onMounted(async () => {
  await fetchData();
});
</script>

<style scoped>
.history-container {
  margin-bottom: 30px;
}
.title {
  margin: 0.625rem 0 0 1.25rem;
  font-weight: 700;
  letter-spacing: 1.5px;
}
.btn {
  font-size: 1rem;
  margin: 1.25rem 0 0 1.25rem;
  width: fit-content;
  padding: 0.3125rem 0.625rem;
  border: 1px solid var(--contrasting-gray);
  color: var(--m-text-color);
  background-color: var(--main-backgound);
  cursor: pointer;
}
.btn:hover,
.btn:hover svg {
  border-color: var(--zafre);
  color: var(--zafre);
}
.exm-cont {
  margin-top: 30px;
}
.btn:active {
  transform: scale(0.95);
}
.empty {
  width: 100%;
  font-size: 30px;
  color: var(--contrasting-gray);
  text-align: center;
  padding: 30px 0;
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
  background-color: var(--main-backgound);
  color: var(--color-heading);
  border-radius: 50%;
  font-size: 16px;
  width: 35px;
  height: 35px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 2px var(--main-backgound);
}
.page-btn:hover {
  border: solid 1px var(--color-heading);
}
.active {
  border: solid 1px var(--color-heading);
}
.currentpage {
  border: solid 1px var(--visible-gray);
}
.skeleton {
  background-color: var(--main-backgound);
  margin: 0 auto;
  width: 95%;
}
.skeleton .skeleton-paragraph {
  background: linear-gradient(
    90deg,
    var(--main-backgound) 25%,
    var(--contrasting-gray) 50%,
    var(--main-backgound) 75%
  );
  background-size: 200% 100%;

  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
.top-row,
.bottom-row {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.mid-row {
  margin: 10px 0;
}
.mid-bar {
  height: 18px;
  width: 60%;
}
.top-item {
  height: 22px;
  width: 100px;
}
.theme-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.theme-select {
  background-color: var(--background-select);
  color: var(--text-select);
  border: 1px solid var(--border);
  border-radius: var(--border-select);
  padding: var(--padding);
  transition: var(--transition);
  font-size: 1rem;
  cursor: pointer;
}

.theme-select:focus {
  outline: none;
  border-color: var(--text-select);
  box-shadow: 0 0 5px var(--text-select);
}
.selectbox {
  display: flex;
  justify-content: end;
  gap: 1.25rem;
  padding: 0 10px;
}
</style>
