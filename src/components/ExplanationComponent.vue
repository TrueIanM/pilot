<template>
  <div>
    <p class="exp">{{ props.Question.explanation }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  Question: Object,
});
</script>

<style scoped>
.exp {
  margin: 14px;
  color: var(--raisin-black);
}
</style>
