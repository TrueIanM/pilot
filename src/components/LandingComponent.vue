<!--
  LandingComponent.vue
  Displays the landing section with title, description, image, and CTA button
-->

<template>
  <header>
    <!-- Text section with heading, description, and button -->
    <div class="landing-text">
      <h1>Ace That Test</h1>
      <p>
        Prepare yourself for your Aviation<br />
        Exams here on Our Website
      </p>
      <a class="landing-button" @click="toSelections">
        Free Test
        <font-awesome-icon class="land-icon" icon="fa-solid fa-arrow-right" />
      </a>
    </div>

    <!-- Hero image section -->
    <div class="landing-image">
      <img src="../assets/aero.png" alt="Hero Image" />
    </div>
  </header>
</template>

<script setup>
// Navigate to exam selection page
import router from "../router/index";
function toSelections() {
  router.push({ name: "select" });
}
</script>

<style scoped>
header {
  width: 80%;
  margin: 0 auto;
  display: flex;
}
.landing-image,
.landing-text {
  width: 50%;
}
.landing-image img {
  width: 100%;
  height: auto;
}
.landing-text {
  margin-top: 30px;
}
.landing-text h1 {
  font-size: 60px;
  font-weight: 600;
}
.landing-text p {
  font-size: 25px;
  margin: 20px 0 60px 0;
}
.landing-button {
  font-size: 25px;
  background-color: var(--teal);
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 30px;
  border: none;
  margin-top: 60px;
}
.landing-button:active {
  opacity: 0.7;
}
.land-icon {
  transform: rotate(-45deg);
}
@media (max-width: 1000px) {
  .landing-text h1 {
    font-size: 45px;
  }
  .landing-text p {
    font-size: 20px;
  }

  header {
    height: 300px;
  }
}
@media (max-width: 750px) {
  .landing-text h1 {
    font-size: 30px;
  }
  .landing-text p {
    font-size: 17px;
  }
  .landing-text,
  .landing-image {
    width: 90%;
    margin: 0 auto;
  }
  header {
    flex-direction: column-reverse;
    height: 600px;
  }
  .landing-text {
    justify-content: start;
  }
  .landing-text p {
    font-size: 25px;
    margin: 5px 0 20px 0;
  }
}
</style>
