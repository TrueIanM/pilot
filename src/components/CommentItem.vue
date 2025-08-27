<!--
  CommentItem.vue
  Displays a single comment with author, message, and relative timestamp
-->

<template>
  <div class="comment">
    <!-- Comment header with name and time -->
    <div class="top">
      <div class="head">{{ props.comment.names }}</div>
      <div class="time">{{ created }}</div>
    </div>

    <!-- User icon -->
    <div class="user-icon">
      <font-awesome-icon icon="fa-solid fa-user-alt" />
    </div>

    <!-- Comment message -->
    <p class="detail">
      {{ props.comment.message }}
    </p>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { computed } from "vue";

// Extend dayjs to support relative time formatting
dayjs.extend(relativeTime);

// Props: single comment object
const props = defineProps({
  comment: Object,
});

// Computed relative timestamp for comment
const created = computed(
  () =>
    "| " +
    dayjs(
      `${props.comment.date_created} ${props.comment.time_created}`
    ).fromNow() +
    " |"
);
</script>

<style scoped>
.top {
  display: flex;
  gap: 0.625rem;
}
.comment {
  position: relative;
  padding: 0 5px 5px 10px;
  display: flex;
  flex-direction: column;
  background-color: var(--light-white);
  margin: 5px 20px;
  color: var(--raisin-black);
}
@media (prefers-color-scheme: light) {
  .comment {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
}
.head {
  margin: 0 0 0.625rem 0.625rem;
  font-size: 1.125rem;
  font-weight: 600;
}
.user-icon {
  position: absolute;
  top: -15px;
  left: -15px;
  padding: 5px;
}
.up-down,
.up,
.down {
  display: flex;
  align-items: center;
}
.up-down {
  gap: 20px;
  margin: 20px 0 0 0;
}
.up,
.down {
  gap: 5px;
  font-size: 13px;
}
</style>
