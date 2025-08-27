<template>
  <div class="container">
    <h1>Register</h1>
    <div>
      <!--
      <WavyLabelInput
        Type="text"
        Label="Names"
        :Required="true"
        :modelValue="name"
        :validator="isNameValid"
        :errorMessage="errorName"
      />
      <WavyLabelInput
        Type="text"
        Label="Username"
        :Required="true"
        :modelValue="username"
        :validator="isUsernameValid"
        :errorMessage="errorUsername"
      />
      <WavyLabelInput
        :modelValue="email"
        Type="text"
        Label="Email"
        :Required="true"
        :validator="isEmail"
        :errorMessage="errorEmail"
      />

      <WavyLabelInput
        Type="tel"
        Label="Phone"
        :Required="true"
        v-model="phone"
        :validator="isPhoneValid"
        :errorMessage="errorPhone"
      />
      <WavyLabelInput
        Type="password"
        Label="Password"
        :Required="true"
        :modelValue="password"
        :validator="isPasswordValid"
        :errorMessage="errorPassword"
      />
      <WavyLabelInput
        Type="password"
        Label="Reenter Password"
        :Required="true"
        :modelValue="rePassword"
        :validator="isPasswordMatch"
        :errorMessage="errorRePassword"
      />
    -->
      <FloatLabel class="input">
        <InputText
          id="username"
          ref="usernameRef"
          @focus="usernameFocus = true"
          @blur="usernameFocus = false"
          v-model="username"
        />
        <label for="username">Username</label>
      </FloatLabel>
      <p class="error-label" v-if="!isUsernameValid">{{ errorUsername }}</p>
      <FloatLabel class="input">
        <InputText
          id="name"
          @focus="nameFocus = true"
          @blur="nameFocus = false"
          ref="nameRef"
          v-model="name"
        />
        <label for="name">Name</label>
      </FloatLabel>
      <p class="error-label" v-if="!isNameValid">{{ errorName }}</p>

      <FloatLabel class="input">
        <InputText
          id="email"
          @focus="emailFocus = true"
          @blur="emailFocus = false"
          ref="emailRef"
          v-model="email"
        />
        <label for="email">Email</label>
      </FloatLabel>
      <p class="error-label" v-if="!isEmail">{{ errorEmail }}</p>

      <FloatLabel class="input">
        <InputText
          id="phone"
          @focus="phoneFocus = true"
          @blur="phoneFocus = false"
          ref="phoneRef"
          v-model="phone"
        />
        <label for="phone">Phone</label>
      </FloatLabel>
      <p class="error-label" v-if="!isPhoneValid">{{ errorPhone }}</p>

      <FloatLabel class="input">
        <InputText
          type="password"
          id="password"
          @focus="passwordFocus = true"
          @blur="passwordFocus = false"
          ref="passwordRef"
          v-model="password"
        />
        <label for="password">Password</label>
      </FloatLabel>
      <p class="error-label" v-if="!isPasswordValid">{{ errorPassword }}</p>

      <FloatLabel class="input">
        <InputText
          type="password"
          id="rePassword"
          @focus="rePasswordFoucs = true"
          @blur="rePasswordFoucs = false"
          ref="rePasswordRef"
          v-model="rePassword"
        />
        <label for="rePassword">Reenter Password</label>
      </FloatLabel>
      <p class="error-label" v-if="!isPasswordMatch">{{ errorRePassword }}</p>
      <button class="btn" @click="register">
        <div v-if="loading" class="loader"></div>
        <span v-else>Register</span>
      </button>
      <p class="error-label" v-if="!isFill && isAttempted">{{ fill }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
//import WavyLabelInput from "../components/WavyLabelInput.vue";
import { useQuestionsStore } from "../stores/counter";
import router from "../router/index";

let store = useQuestionsStore();
const loading = ref(false);
const usernameFocus = ref(false);
const email = ref("");
const errorEmail = ref("Your Email is Invalid");
const emailFocus = ref(false);
const emailRef = ref(null);
const name = ref("");
const nameRef = ref(null);
const nameFocus = ref(false);
const username = ref("");
const errorUsername = ref("Field Cannot be Empty");
const usernameRef = ref(null);
const phone = ref("");
const errorPhone = ref("Phone Number is Invalid");
const phoneRef = ref(null);
const phoneFocus = ref(false);
const errorName = ref("Please Enter Your Name");
const password = ref("");
const passwordRef = ref(null);
const passwordFocus = ref(false);
const errorPassword = ref(
  "Password Should be more than seven " +
    "chracters long,contain at least one " +
    "lowercase letter,uppercase letter," +
    "digit and special character"
);
const rePassword = ref("");
const errorRePassword = ref("Passwords Do Not Match");
const rePasswordFoucs = ref(false);
const rePasswordRef = ref(null);
const fill = ref("Please Fill in All The Fields");
const isFill = ref(false);
const isAttempted = ref(false);

const isEmail = computed(() => {
  if (emailFocus.value) return true;
  if (email.value === "") return true;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.value);
});

const isNameValid = computed(() => {
  if (nameFocus.value) return true;
  if (name.value === "") return true;
  return name.value !== null && name.value.length !== 0;
});

const isUsernameValid = computed(() => {
  if (usernameFocus.value) return true;
  if (username.value === "") return true;
  return username.value !== null && username.value.length !== 0;
});

const isPhoneValid = computed(() => {
  if (phoneFocus.value) return true;
  if (phone.value === "") return true;
  const cleanedPhoneNumber = phone.value.replace(/\D/g, "");
  return cleanedPhoneNumber.length === 10;
});

const isPasswordValid = computed(() => {
  if (passwordFocus.value) return true;
  if (password.value === "") return true;
  const pwd = password.value;
  if (pwd.length < 8) {
    return false;
  }
  if (!/[a-z]/.test(pwd)) {
    return false;
  }
  if (!/[A-Z]/.test(pwd)) {
    return false;
  }
  if (!/\d/.test(pwd)) {
    return false;
  }
  if (!/[!@#$%^&*()\-_=+{};:,<.>]/.test(pwd)) {
    return false;
  }
  return true;
});

const isPasswordMatch = computed(() => {
  if (rePasswordFoucs.value) return true;
  if (password.value === "" || rePassword.value === "") return true;
  return password.value === rePassword.value;
});

async function register() {
  isAttempted.value = true;
  isFill.value =
    isEmail.value &&
    isNameValid.value &&
    isUsernameValid.value &&
    isPasswordValid.value &&
    isPasswordMatch.value;
  if (!isFill.value) return;
  let _email = email.value;
  let details = {
    email: _email,
    name: name.value,
    username: username.value,
    phone: phone.value,
    password: password.value
  };
  loading.value = true;
  let res = await store.registerUser(details);
  loading.value = false;
  alert(res.message);
  if (res.success) router.push({ name: "login" });
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
</style>
