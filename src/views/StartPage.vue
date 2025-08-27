<template>
  <div>
    <NavRoutes />
    <nav>
      <div class="logo-title">
        <IconPlane />
        <h1>PILOT EXAM</h1>
      </div>
      <div
        v-if="questionStore.user.isLoggedIn"
        class="main-select"
        @click="openCloseMenu"
      >
        <div class="avatar-rad">
          <font-awesome-icon icon="fa-regular fa-user" />
        </div>
        <font-awesome-icon icon="fa-solid fa-angle-down" />
        <ul
          class="menu-list"
          :class="{
            open: questionStore.open_close,
            close: !questionStore.open_close
          }"
        >
          <li>{{ questionStore.user.email }}</li>
          <li @click="logOut">Log out</li>
        </ul>
      </div>
      <button class="side-menu-button">
        <font-awesome-icon icon="fa-solid fa-bars-staggered" />
      </button>
    </nav>
    <section>
      <UserProfile v-if="questionStore.user.isLoggedIn" />
      <LandingComp v-else />
    </section>
  </div>
</template>

<script setup>
import { useQuestionsStore } from "../stores/counter";
import LandingComp from "../components/LandingComponent.vue";
import IconPlane from "../components/icons/IconPlane.vue";
import UserProfile from "../components/UserProfile.vue";
import NavRoutes from "../components/NavRoutes.vue";
import { deleteUser } from "../scripts/modes";
import router from "../router";

let questionStore = useQuestionsStore();

function openCloseMenu() {
  questionStore.open_close = !questionStore.open_close;
  questionStore.overlayVisibility = !questionStore.overlayVisibility;
}
function logOut() {
  deleteUser(questionStore);
  router.push({ name: "home" });
}
</script>

<style scoped>
.side-menu-button {
  margin: 0 8% 0 0;
}
.menu-list {
  flex-direction: column;
  position: absolute;
  top: 80px;
  list-style-type: none;
  background-color: var(--main-backgound);
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.3);
}
.menu-list li {
  padding: 3px 15px;
}
nav {
  position: sticky;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  color: #fff;
  z-index: 3;
}
.logo-title svg {
  width: 50px;
  height: 50px;
}
.logo-title {
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 10px 5px 5px 20px;
  font-size: 20px;
}
.logo-title h1 {
  letter-spacing: 2px;
  font-weight: 600;
}
.avatar-rad {
  font-size: 15px;
  background-color: #d0e1d4;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--always-black);
}
.main-select {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 8% 0 0;
  gap: 10px;
  padding: 5px;
  z-index: 3;
}
.main-select:hover {
  background-color: #d0e1d44f;
  cursor: pointer;
}
@media (min-width: 1000px) {
  .side-menu-button {
    display: none;
  }
}
@media (max-width: 1000px) {
  .nav-list,
  .main-select {
    display: none;
  }
}
</style>
