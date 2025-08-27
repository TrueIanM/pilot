<!--
  Details.vue
  Displays and allows editing of user information
-->

<template>
  <div class="container">
    <!-- Section title -->
    <div class="title">User Information</div>

    <!-- Editable details pane -->
    <div class="details-pane">
      <EditDetails
        name="Username"
        v-model="store.user.username"
        :isEditable="isFalse"
      />
      <EditDetails
        name="Names"
        v-model="store.user.names"
        :isEditable="isTrue"
      />
      <EditDetails
        name="Email"
        v-model="store.user.email"
        :isEditable="isFalse"
      />
      <EditDetails
        name="Phone"
        v-model="store.user.phone"
        :isEditable="isFalse"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import EditDetails from "../components/EditDeails.vue";
import { useQuestionsStore } from "../stores/counter";

// Flags to control editable fields
const isFalse = ref(false);
const isTrue = ref(true);

// Access user store
let store = useQuestionsStore();
</script>

<style scoped>
.title {
  font-size: 30px;
  font-weight: 600;
  margin: 0 0 10px 30px;
}
.details-pane {
  margin: 30px 0 10px 20px;
}
</style>
