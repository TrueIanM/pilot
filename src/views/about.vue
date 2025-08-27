<template>
  <div class="main-cont">
    <NavRoutes />
  </div>
  <div class="about-container">
    <div class="about-content">
      <h1>About Us</h1>
      <p>
        Welcome to our Pilot Exam Preparation platform! Whether you're just
        starting your journey to become a pilot or are a seasoned professional
        looking to refresh your knowledge, we're here to help.
      </p>
      <p>
        Our platform offers over <strong>17,000 questions</strong> covering a
        wide range of topics. From basic concepts to advanced scenarios, you'll
        find everything you need to succeed.
      </p>
      <p>
        Start your journey with us and take a step closer to achieving your
        aviation goals. Prepare with confidence and fly with success!
      </p>
    </div>
  </div>
</template>

<script setup>
import NavRoutes from "../components/NavRoutes.vue";
</script>

<style scoped>
.about-container {
  min-height: 100vh;
  padding: 20px;
  background-color: var(--main-backgound);
}

.about-content {
  width: 90%;
  margin: 0 auto;
  background-color: var(--light-white);
  padding: 20px;
  border-radius: 10px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: var(--m-text-color);
}

p {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--m-text-color);
}

strong {
  color: #e74c3c;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .about-content {
    padding: 15px;
  }

  h1 {
    font-size: 1.75rem;
  }

  p {
    font-size: 0.95rem;
  }
}
</style>
