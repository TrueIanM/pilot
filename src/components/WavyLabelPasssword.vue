<!--
  WavyLabelPassword.vue
  Handles password and confirm password inputs with toggle visibility, validation, and animated labels
-->

<template>
  <div class="row">
    <!-- Password field -->
    <div class="form-control">
      <input
        :type="PasswordType"
        required="true"
        v-model="localValue"
        @focus="inputEvent(true)"
        @blur="inputEvent(false)"
        :class="{ invalid: !isValid }"
      />
      <label>
        <span
          v-for="(letter, index) in Passwordlabel"
          :style="{ transitionDelay: getDelay(index) }"
          >{{ letter }}</span
        >
      </label>
      <p class="message" v-if="!isValid">{{ errorMessage }}</p>
    </div>

    <!-- Toggle password visibility -->
    <div @click="showPassword = !showPassword" class="eye">
      <font-awesome-icon v-if="showPassword" icon="fa-regular fa-eye-slash" />
      <font-awesome-icon v-else icon="fa-regular fa-eye" />
    </div>
  </div>

  <div class="row">
    <!-- Confirm password field -->
    <div class="form-control">
      <input
        :type="RePasswordType"
        required="true"
        v-model="rePassword"
        @focus="ReinputEvent(true)"
        @blur="ReinputEvent(false)"
        :class="{ invalid: !ReisValid }"
      />
      <label>
        <span
          v-for="(letter, index) in RePasswordlabel"
          :style="{ transitionDelay: getDelay(index) }"
          >{{ letter }}</span
        >
      </label>
      <p class="message" v-if="!ReisValid">{{ ReerrorMessage }}</p>
    </div>

    <!-- Toggle confirm password visibility -->
    <div @click="ReshowPassword = !ReshowPassword" class="eye">
      <font-awesome-icon v-if="ReshowPassword" icon="fa-regular fa-eye-slash" />
      <font-awesome-icon v-else icon="fa-regular fa-eye" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { isPasswordValid } from "../scripts/modes";

// Props for model binding
const props = defineProps({
  modelValue: String,
});

// Password and confirm password states
const inputFocus = ref(false);
const showPassword = ref(false);
const ReinputFocus = ref(false);
const ReshowPassword = ref(false);

// Error messages
const errorMessage = ref(
  "Password Should be more than seven " +
    "chracters long,contain at least one " +
    "lowercase letter,uppercase letter," +
    "digit and special character"
);
const ReerrorMessage = ref("Password does not match");

// Animated labels
const Passwordlabel = computed(() => "Password".split(""));
const RePasswordlabel = computed(() => "Reenter Password".split(""));

// Input types based on visibility toggle
const PasswordType = computed(() => checkValidType(showPassword.value));
const RePasswordType = computed(() => checkValidType(ReshowPassword.value));

function checkValidType(val) {
  return val ? "text" : "password";
}

// Animation delay for each letter
function getDelay(index) {
  return index * 50 + "ms";
}

// Emits value updates
const emit = defineEmits(["update:modelValue"]);
const localValue = ref(props.modelValue);
const rePassword = ref("");

watch(localValue, (newValue) => {
  emit("update:modelValue", newValue);
});

// Validation states
const isValid = computed(() => {
  if (inputFocus.value) return true;
  if (localValue.value.length < 1) return true;
  return isPasswordValid(localValue.value);
});
const ReisValid = computed(() => {
  if (ReinputFocus.value) return true;
  if (rePassword.value.length < 1) return true;
  return localValue.value === rePassword.value;
});

// Focus/blur handlers
function inputEvent(val) {
  inputFocus.value = val;
}
function ReinputEvent(val) {
  ReinputFocus.value = val;
}
</script>

<style scoped>
.message {
  color: var(--incorrect-answer);
  font-size: 12px;
}
.form-control {
  position: relative;
  margin: 10px 0 25px;
  width: 280px;
}

.form-control input {
  background-color: transparent;
  border: 0;
  border-bottom: 2px var(--contrasting-gray) solid;
  display: block;
  width: 100%;
  padding: 8px 0;
  font-size: 15px;
  color: var(--color-heading);
}

.form-control input:focus,
.form-control input:valid {
  outline: 0;
  border-bottom-color: var(--zafre);
}

.form-control label {
  position: absolute;
  top: 3px;
  left: 0;
  pointer-events: none;
  color: var(--contrasting-gray);
  font-weight: 700;
}

.form-control label span {
  display: inline-block;
  font-size: 13px;
  min-width: 5px;
  transition: 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.form-control input:focus + label span,
.form-control input:valid + label span {
  color: var(--zafre);
  transform: translateY(-20px);
}
.form-control .invalid {
  color: var(--incorrect-answer);
}

.form-control .invalid:focus + label span,
.form-control .invalid:invalid + label span {
  color: var(--incorrect-answer);
}
.form-control input.invalid {
  border-bottom-color: var(--incorrect-answer);
}
.row {
  display: flex;
}
.eye {
  margin-top: 18px;
  margin-left: 8px;
}
</style>
