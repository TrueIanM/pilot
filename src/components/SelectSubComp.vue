<!--
  SelectSubComp.vue
  Displays subjects for the selected level and emits the chosen subject
-->

<template>
  <div class="level-comp">
    <!-- Display selected level -->
    <h1 class="title">{{ props.Level }}</h1>
    <!-- Dropdown of subjects -->
    <select name="subs" id="subs" v-model="picked">
      <option v-for="item in store.subjects" :value="item" class="list-item">
        {{ item }}
      </option>
    </select>
    <!-- Start exam with selected subject -->
    <button class="btn" @click="emits('getLevel', 2, picked)">
      Start Exam
    </button>
  </div>
</template>

<script setup>
import { useQuestionsStore } from "../stores/counter";
import { ref } from "vue";

// Access store for subjects
let store = useQuestionsStore();

// Props and emits
let props = defineProps(["Level"]);
let emits = defineEmits(["getLevel"]);

// Track picked subject
const picked = ref(store.subjects[0]);
</script>

<style scoped>
.level-comp {
  width: 40%;
  margin: 0 auto;
  color: var(--raisin-black);
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.title {
  margin: 20px auto;
  width: 100%;
  font-weight: 400;
}
.list-item {
  padding: 10px;
  background-color: var(--light-white);
  color: var(--raisin-black);
}
#subs {
  border: none;
  padding: 8px 10px;
  background-color: var(--light-white);
  color: var(--raisin-black);
  font-size: 16px;
  font-weight: 400;
  box-shadow: var(--min-shadow);
}
.btn {
  border: none;
  margin: 20px 0 0 0;
  padding: 8px 10px;
  background-color: var(--indigo);
  font-size: 16px;
  letter-spacing: 1px;
  cursor: pointer;
}
.btn:active {
  opacity: 0.9;
}
</style>
