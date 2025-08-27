<!--
  EditDetails.vue
  Handles displaying and editing a single user detail
-->

<template>
  <div class="container">
    <!-- Label and value/input field -->
    <div class="detail">
      <label class="det-label">{{ props.name }}</label>
      <label v-if="isNotEdit" class="det">{{ localValue }}</label>
      <input v-else type="text" class="det" v-model="localValue" />
    </div>

    <!-- Toggle edit mode button -->
    <button
      v-if="props.isEditable"
      @click="isNotEdit = !isNotEdit"
      class="edit"
    >
      <font-awesome-icon icon="fa-solid fa-pen-to-square" />
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

// Props: value, field name, edit permission
const props = defineProps({
  modelValue: String,
  name: String,
  isEditable: Boolean,
});

// Emits updated value for v-model binding
const emit = defineEmits(["update:modelValue"]);

// Tracks if field is in view or edit mode
const isNotEdit = ref(true);

// Local copy of value for editing
const localValue = ref(props.modelValue);

// Sync local value with parent
watch(localValue, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>

<style scoped>
.container {
  margin: 5px 0 5px 10px;
  display: flex;
}
.detail {
  width: 6.25rem;
  display: flex;
  flex-direction: column;
}
.det {
  width: 100%;
}
.edit {
  height: fit-content;
  border: none;
  background-color: var(--light-white);
  padding: 0.3125rem;
  cursor: pointer;
}
.det-label {
  color: var(--visible-gray);
  font-size: 0.8125rem;
  font-weight: 600;
}
</style>
