<template>
  <NavRoutes />
  <div class="contact-container">
    <div class="contact-content">
      <h1>Contact Us</h1>

      <div class="contact-info">
        <p><strong>Email:</strong> contact@pilotexams.com</p>
        <p><strong>Phone:</strong> +1 234 567 890</p>
        <p><strong>Address:</strong> 123 Aviation Blvd, Sky City, 98765</p>
      </div>

      <form class="contact-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" placeholder="Enter your name" />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>

        <div class="form-group">
          <label for="message">Message</label>
          <textarea
            id="message"
            rows="5"
            placeholder="Enter your message"
          ></textarea>
        </div>

        <button type="submit">Send Message</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import NavRoutes from "../components/NavRoutes.vue";
</script>

<style scoped>
.contact-container {
  min-height: 100vh;
  padding: 20px;
  background-color: var(--main-backgound);
}
.contact-content {
  width: 90%;
  margin: 0 auto;
  background-color: var(--light-white);
  padding: 25px;
  border-radius: 10px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: var(--m-text-color);
}

.contact-info {
  margin-bottom: 30px;
}

.contact-info p {
  font-size: 1.125rem;
  color: var(--m-text-color);
}
.contact-form {
  max-width: 400px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  color: var(--m-text-color);
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  font-size: 1rem;
  outline: none;
}

input:focus,
textarea:focus {
  border-color: #3498db;
}

button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  .contact-info p {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .contact-content {
    padding: 15px;
  }

  h1 {
    font-size: 1.75rem;
  }

  .contact-info p {
    font-size: 0.95rem;
  }
}
</style>
