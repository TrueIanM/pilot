<!--
  SelectLevelComp.vue
  Displays a list of levels and emits the selected level
-->

<template>
  <div class="level-comp">
    <!-- Component title -->
    <h1 class="title">Select Level</h1>
    <div class="list-select">
      <!-- List all levels from store -->
      <div
        v-for="item in store.levels"
        @click="emits('getLevel', 1, item)"
        class="list-item"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
// Import store for levels
import { useQuestionsStore } from "../stores/counter";
let store = useQuestionsStore();

// Emit selected level
let emits = defineEmits(["getLevel"]);
</script>

<style scoped>
.level-comp {
  width: 30%;
  margin: 0 auto;
  color: var(--raisin-black);
}
.title {
  margin: 20px auto;
  width: 100%;
  font-weight: 400;
}
.list-select {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 50vh;
  overflow-y: scroll;
  padding: 5px;
}
.list-item {
  padding: 10px;
  box-shadow: var(--min-shadow);
  cursor: pointer;
  background-color: var(--light-white);
}
</style>
