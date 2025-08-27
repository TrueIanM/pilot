<template>
  <div class="top">
    <div v-if="isVerify" class="container">
      <h1 class="title">Verify Your Email Address</h1>
      <p class="instruction">
        Please Login into your email {{ email }} read and insert the code we
        have sent to you
      </p>
      <div class="single-row">
        <input
          type="text"
          v-for="(input, index) in inputs"
          :key="index"
          v-model="inputValues[index]"
          :ref="`input-${index}`"
          :id="`input-${index}`"
          maxlength="1"
          @input="onInput(index, $event)"
          @keydown="onKeyDown(index, $event)"
          class="single"
        />
      </div>
      <button class="btn" @click="verify">
        <div v-if="loading" class="loader"></div>
        <span v-else>Verify</span>
      </button>
    </div>
    <div v-else class="container">
      <h1>Register</h1>
      <div>
        <WavyLabelInput
          Type="text"
          Label="Names"
          v-model="name"
          :validator="isNameValid"
          :Required="true"
          :errorMessage="errorName"
        />
        <WavyLabelInput
          Type="text"
          Label="Username"
          v-model="username"
          :validator="isUsernameValid"
          :Required="true"
          :errorMessage="errorUsername"
        />
        <WavyLabelInput
          v-model="email"
          Type="text"
          Label="Email"
          :validator="isEmail"
          :Required="true"
          :errorMessage="errorEmail"
        />

        <WavyLabelInput
          Type="tel"
          Label="Phone"
          v-model="phone"
          :validator="isPhoneValid"
          :Required="true"
          :errorMessage="errorPhone"
        />
        <WavyLabelPasssword v-model="password" />

        <button class="btn" @click="register">
          <div v-if="loading" class="loader"></div>
          <span v-else>Register</span>
        </button>
        <p class="error-label" v-if="isAttempted && !isFill">{{ fill }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import WavyLabelInput from "../components/WavyLabelInput.vue";
import WavyLabelPasssword from "../components/WavyLabelPasssword.vue";
import { useQuestionsStore } from "../stores/counter";
import { isPasswordValid } from "../scripts/modes";
import router from "../router/index";

let store = useQuestionsStore();
const loading = ref(false);
const email = ref("");
const errorEmail = ref("Your Email is Invalid");
const name = ref("");
const username = ref("");
const errorUsername = ref("Field Cannot be Empty");
const phone = ref("");
const errorPhone = ref("Phone Number is Invalid");
const errorName = ref("Please Enter Your Name");
const password = ref("");
const fill = ref("Please Fill in All The Fields");
const isFill = ref(false);
const isVerify = ref(false);
const inputs = ref([0, 1, 2, 3, 4, 5]);
const inputValues = ref(["", "", "", "", "", ""]);
const isAttempted = ref(false);

function onInput(index, event) {
  let value = event.target.value.toUpperCase();

  if (/^[0-9A-B]$/.test(value)) {
    inputValues.value[index] = value;
    moveToNextInput(index);
  } else {
    inputValues.value[index] = "";
  }
}
function onKeyDown(index, event) {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
  }
}
function moveToNextInput(index) {
  const nextIndex = index + 1;
  if (nextIndex < inputs.value.length) {
    const nextInput = document.getElementById(`input-${nextIndex}`);
    if (nextInput) {
      nextInput.focus();
    }
  }
}

function isEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

function isNameValid(value) {
  return value !== null && value.length !== 0;
}

function isUsernameValid(value) {
  return value !== null && value.length > 2;
}

function isPhoneValid(value) {
  const cleanedPhoneNumber = value.replace(/\D/g, "");
  return cleanedPhoneNumber.length === 10;
}

async function register() {
  isAttempted.value = true;
  isFill.value =
    isEmail(email.value) &&
    isNameValid(name.value) &&
    isUsernameValid(username.value) &&
    isPasswordValid(password.value);

  if (!isFill.value) return;

  let details = {
    email: email.value,
    name: name.value,
    username: username.value,
    phone: phone.value,
    password: password.value
  };
  loading.value = true;
  let res = await store.registerUser(details);

  console.log(details);
  loading.value = false;
  alert(res.message);
  if (res.success) router.push({ name: "login" });
}
function verify() {
  isVerify.value = false;
}
</script>

<style scoped>
.input {
  margin: 15px 0;
}
.loader {
  display: flex;
  margin-left: 45%;
  width: 30px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #25b09b;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}
.container {
  background-color: var(--light-white);
  padding: 20px 40px;
  border-radius: 5px;
  width: 350px;
  margin: 40px auto 0 auto;
  color: var(--raisin-black);
  box-shadow: var(--min-shadow);
  animation: pop-in 0.5s;
}
@keyframes pop-in {
  0% {
    opacity: 0.5;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.container h1 {
  text-align: center;
  margin-bottom: 25px;
}

.container a {
  text-decoration: none;
  color: lightblue;
}

.btn {
  cursor: pointer;
  display: inline-block;
  width: 100%;
  background: lightblue;
  padding: 15px;
  font-family: inherit;
  font-size: 16px;
  border: 0;
  border-radius: 5px;
}

.btn:focus {
  outline: 0;
}

.btn:active {
  transform: scale(0.98);
}
.single-row {
  display: flex;
  justify-content: space-between;
  margin: 40px 0;
}
.single {
  width: 1.5625rem;
  height: 1.875rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  font-family: "Segoe UI";
  caret-color: transparent;
  outline-color: var(--zafre);
}
</style>
