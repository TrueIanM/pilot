<!--
  NavRoutes.vue
  Displays the top navigation bar with links based on user login status
-->

<template>
  <div class="top-nav">
    <!-- Navigation links -->
    <ul class="nav-list">
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><a href="https://blog.aviationexamkenya.com/">Shop</a></li>
      <li><a href="https://blog.aviationexamkenya.com/">Blog</a></li>
      <li><RouterLink to="/contactus">Contact us</RouterLink></li>
      <li style="margin-right: 50px">
        <RouterLink to="/about">About</RouterLink>
      </li>
      <!-- Show login/register links if user is not logged in -->
      <li v-if="!questionStore.user.isLoggedIn">
        <RouterLink to="/login">Login</RouterLink>
      </li>
      <li v-if="!questionStore.user.isLoggedIn">or</li>
      <li v-if="!questionStore.user.isLoggedIn">
        <RouterLink to="/register">Register</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
// Import router link and store for user state
import { RouterLink } from "vue-router";
import { useQuestionsStore } from "../stores/counter";

let questionStore = useQuestionsStore();
</script>

<style scoped>
.nav-list {
  display: flex;
  flex-direction: row;
  gap: 1.25rem;
  margin: 8px 10% 8px 0;
  list-style: none;
}
.nav-list a {
  text-decoration: none;
  font-weight: 600;
}
.top-nav {
  display: flex;
  justify-content: end;
}
</style>
