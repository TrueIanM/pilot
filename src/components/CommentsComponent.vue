<!--
  CommentComponent.vue
  Handles displaying comments for a question and submitting new comments
-->

<template>
  <div class="m">
    <!-- Header -->
    <div class="comments-header">
      <h1 class="head">User Comments</h1>

      <!-- Comment input area -->
      <div class="comment-container">
        <div class="avatar">
          <div class="user-icon">
            <font-awesome-icon icon="fa-solid fa-user-alt" />
          </div>
        </div>
        <div class="column">
          <input
            class="comment-input"
            type="text"
            placeholder="Add Your Comment here"
            v-model="commment_details"
          />
          <!-- Submit/Cancel controls -->
          <div v-show="comment_active" class="comment-control">
            <button @click="closeComment" class="control">Cancel</button>
            <button @click="addComment" class="control">Submit</button>
          </div>
        </div>
      </div>

      <!-- Display comments -->
      <Comment v-if="props.ID == 0" />
      <Comment v-else :ID="uuid" />
    </div>
  </div>
</template>

<script setup>
import Comment from "./Comment.vue";
import { ref, computed } from "vue";
import { useCommentsStore } from "../stores/commentsStore";
import { useQuestionsStore } from "../stores/counter";
import { getDate, getCurrentTime } from "../scripts/modes";

// Props: optional ID for a specific question
const props = defineProps({
  ID: {
    type: Number,
    default: 0,
  },
});

// Local state for new comment input
const commment_details = ref("");
const comment_active = computed(() => commment_details.value.length > 0);

// Stores
let commentStore = useCommentsStore();
let questionStore = useQuestionsStore();

// Determine the current question index and UUID
const commentIndex = computed(() =>
  props.ID == 0 ? questionStore.exam.current_question : props.ID
);
const uuid = computed(
  () => questionStore.exam.questions[commentIndex.value].uuid
);

// Add new comment
async function addComment() {
  let res = await commentStore.addComment({
    table: "comments",
    user_id: questionStore.user.id,
    uuid: questionStore.exam.questions[commentIndex.value].uuid,
    message: commment_details.value,
    date: getDate(),
    time: getCurrentTime(),
    names: questionStore.user.names,
  });
  if (res) {
    questionStore.increaseCommentsCount(commentIndex.value);
    commment_details.value = "";
  }
}

// Reset comment input
function closeComment() {
  commment_details.value = "";
}
</script>

<style scoped>
.m {
  display: flex;
  flex-direction: column;
}
.avatar {
  margin: 0 10px;
  display: flex;
  align-items: start;
  justify-content: start;
}
.head {
  font-size: 2rem;
  margin: 1.25rem 1.5rem 1.25rem 0;
  color: var(--raisin-black);
}
.comment-container {
  display: flex;
  margin: 40px 0;
}
.comment-input {
  min-width: 25rem;
  border-top: 0;
  border-left: 0;
  border-right: 0;
  border-bottom: var(--visible-gray) 2px solid;
  font-size: 1rem;
  color: var(--m-text-color);
  background-color: var(--main-background);
  padding: 3px 0;
}
.comment-input:focus {
  outline: none;
  border-bottom: var(--teal) 2px solid;
}
.control {
  border: none;
  padding: 0.3125rem 0.625rem;
  font-size: 0.875rem;
  color: var(--m-text-color);
  cursor: pointer;
  background: transparent;
  border-radius: 10px;
  font-weight: 600;
}
.comment-control {
  display: flex;
  justify-content: end;
  margin-top: 10px;
  gap: 20px;
}
.control:hover {
  background: var(--teal);
  color: black;
}
</style>
