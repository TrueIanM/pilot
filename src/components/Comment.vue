<!--
  Comments.vue
  Displays a list of comments and their replies with a skeleton loader during fetch
-->

<template>
  <div class="container">
    <!-- Skeleton loader while fetching comments -->
    <div v-if="loading" class="skeleton-loader">
      <div class="comment">
        <div class="avatar-placeholder"></div>
        <div class="comment-body">
          <div class="username-placeholder"></div>
          <div class="timestamp-placeholder"></div>
          <div class="text-placeholder line1"></div>
          <div class="text-placeholder line2"></div>
          <div class="text-placeholder line3"></div>
        </div>
      </div>
    </div>

    <!-- Display comments and replies once loaded -->
    <div v-else>
      <div
        v-if="commentsStore.comments.length > 0"
        v-for="comnt in commentsStore.comments"
      >
        <CommentItem :comment="comnt" />
        <div class="replys">
          <CommentItem v-for="reply in comnt.replys" :comment="reply" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CommentItem from "./CommentItem.vue";
import { useCommentsStore } from "../stores/commentsStore";
import { useQuestionsStore } from "../stores/counter";
import { ref } from "vue";

// Loading state for comments
const loading = ref(false);

// Stores for comments and questions
let commentsStore = useCommentsStore();
let questionStore = useQuestionsStore();

// Props for optional ID of the target question
const props = defineProps({
  ID: {
    type: Number,
    default: 0,
  },
});

// Fetch comments and their replies
async function loadComments() {
  loading.value = true;

  // Fetch top-level comments
  await commentsStore.fetchComments({
    table: "comments",
    id:
      props.ID == 0
        ? questionStore.exam.questions[questionStore.exam.current_question].uuid
        : props.ID,
  });

  // Fetch replies for each comment
  commentsStore.comments.forEach(async (comment, index) => {
    await commentsStore.fetchComments({
      table: "replys",
      id: comment.ID,
      index: index,
    });
  });

  loading.value = false;
}

// Initialize loading of comments
loadComments();
</script>

<style scoped>
.replys {
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}
@keyframes shimmer {
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
}

.skeleton-loader {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comment {
  display: flex;
  gap: 12px;
}

.avatar-placeholder {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--skeleton-base);
  background-image: linear-gradient(
    90deg,
    var(--skeleton-base) 25%,
    var(--skeleton-highlight) 50%,
    var(--skeleton-base) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.comment-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.username-placeholder,
.timestamp-placeholder,
.text-placeholder {
  background: var(--skeleton-base);
  background-image: linear-gradient(
    90deg,
    var(--skeleton-base) 25%,
    var(--skeleton-highlight) 50%,
    var(--skeleton-base) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1s infinite;
  border-radius: 4px;
}

.username-placeholder {
  width: 30%;
  height: 12px;
}

.timestamp-placeholder {
  width: 20%;
  height: 10px;
}

.text-placeholder {
  height: 10px;
}

.text-placeholder.line1 {
  width: 100%;
}

.text-placeholder.line2 {
  width: 90%;
}

.text-placeholder.line3 {
  width: 80%;
}
</style>
