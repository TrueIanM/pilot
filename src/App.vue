<!--
  App.vue
  Root component that renders the router view and overlay
-->

<script setup>
import { RouterView } from "vue-router";
import { useQuestionsStore } from "./stores/counter";
import { checkLocalStorage, setUserLocal } from "./scripts/modes";

// Global store
let questionStore = useQuestionsStore();

// Initialize user data from local storage if available
if (checkLocalStorage()) setUserLocal(questionStore);

// Close overlay handler
function close() {
  if (questionStore.open_close) questionStore.open_close = false;
  questionStore.overlayVisibility = false;
}
</script>

<template>
  <!-- Main router outlet -->
  <RouterView />

  <!-- Overlay -->
  <div
    class="overlay"
    :class="{ show: questionStore.overlayVisibility }"
    ref="overlay"
    @click="close"
  ></div>
</template>

<style>
.overlay {
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.8;
  position: absolute;
  top: 0;
  left: 0;
  display: none;
  z-index: 2;
}
</style>
