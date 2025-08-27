<!--
  UserProfile.vue
  Displays user profile with navigation between History, Details, and Statistics
-->

<template>
  <div class="user-container">
    <!-- Progress bar -->
    <div
      v-if="store.progress > 0"
      class="line-loader"
      :style="{ width: store.userProgress + '%' }"
    ></div>

    <!-- Profile information -->
    <div class="profile-container">
      <div class="title">User Profile</div>
      <div class="image-container">
        <div class="image">
          <img class="img" :src="userImage" alt="User Image" />
          <!-- File input commented out for future image upload -->
        </div>
      </div>
      <div class="names">{{ store.user.names }}</div>

      <!-- Navigation tabs -->
      <div class="sec-cont">
        <div
          class="secs"
          :class="{ active: historyComp }"
          @click="setviewHistory"
        >
          History
        </div>
        <div
          class="secs"
          :class="{ active: detailsComp }"
          @click="setViewDetails"
        >
          Details
        </div>
        <div class="secs" :class="{ active: statsComp }" @click="setViewStats">
          Statistics
        </div>
      </div>
    </div>

    <!-- Dynamic content based on selected tab -->
    <component :is="view" class="content-container"> </component>
  </div>
</template>

<script setup>
import History from "../components/History.vue";
import Details from "../components/Details.vue";
import Stats from "./StatsComp.vue";
import { ref } from "vue";
import { useQuestionsStore } from "../stores/counter";

// Access store
let store = useQuestionsStore();

// Current active view
let view = History;

// Default user image
const userImage = ref("https://aviationexamkenya.com/profile/userDefault.jpg");

// Tab state
const historyComp = ref(true);
const detailsComp = ref(false);
const statsComp = ref(false);

// Tab switch functions
function setviewHistory() {
  view = History;
  historyComp.value = true;
  detailsComp.value = false;
  statsComp.value = false;
}
function setViewDetails() {
  view = Details;
  detailsComp.value = true;
  historyComp.value = false;
  statsComp.value = false;
}
function setViewStats() {
  view = Stats;
  statsComp.value = true;
  historyComp.value = false;
  detailsComp.value = false;
}
</script>

<style scoped>
.user-container {
  display: flex;
  padding: 0 10% 0 10%;
  justify-content: space-between;
}
.profile-container {
  width: 30%;
  background-color: var(--light-white);
  margin-top: 1.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
}
.image {
  width: 7.5rem;
  height: 7.5rem;
  border: 2px solid var(--visible-gray);
  border-radius: 50%;
  position: relative;
}
.img-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0.0063rem;
  height: 0.0063rem;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}
.img-btn + label {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 1.4em;
  font-weight: 700;
  display: inline-block;
  cursor: pointer;
}

.img-btn:focus + label,
.img-btn + label:hover svg {
  color: var(--zafre);
}
.title {
  font-size: 30px;
  font-weight: 600;
  margin: 0 0 0.625rem 0;
}
.names {
  margin: 5px 0;
}
.sec-cont {
  margin: 1.875rem 0 0.625rem 0;
  font-size: 1.25rem;
  width: 100%;
}
.secs {
  padding: 0.5rem 0;
  cursor: pointer;
  width: 100%;
  padding-left: 0.625rem;
}
.active {
  background-color: var(--visible-gray);
  color: var(--main-backgound);
}
.content-container {
  width: 60%;
  background-color: var(--light-white);
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}
.img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.line-loader {
  height: 4px;
  background-color: #42b983;
  transition: width 0.2s ease;
}
</style>
