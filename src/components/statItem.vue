<!--
  statItem.vue
  Displays a point on a timeline with optional connecting lines and associated details
-->

<template>
  <div class="container">
    <!-- Timeline point with top/bottom lines -->
    <div class="point">
      <div v-if="top" class="top-line"></div>
      <div class="circle"></div>
      <div v-if="bottom" class="bottom-line"></div>
    </div>

    <!-- Details and value next to the timeline point -->
    <div class="details-value">
      <div class="details">{{ props.details }}</div>
      <div class="val">{{ props.val }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Props for timeline item
const props = defineProps({
  index: Number,     // Position in the timeline
  length: Number,    // Total number of items
  details: String,   // Description text
  val: Number        // Value to display
});

// Determine if top/bottom connecting lines should be shown
const top = computed(() => props.index !== 0);
const bottom = computed(() => props.index + 1 !== props.length);
</script>
</style>

.point {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 26px;
  width: 26px;
}
.container {
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 15px;
}
.top-line {
  position: absolute;
  top: 0;
  left: 12px;
  width: 2px;
  height: 48%;
  background-color: var(--visible-gray);
}
.bottom-line {
  position: absolute;
  top: 50%;
  left: 12px;
  width: 2px;
  height: 50%;
  background-color: var(--visible-gray);
}
.circle {
  width: 11px;
  height: 11px;
  border: 2px solid var(--visible-gray);
  border-radius: 50%;
  z-index: 1;
  background-color: var(--main-backgound);
}
.details-value {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>
