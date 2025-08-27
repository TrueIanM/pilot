<template>
  <div class="container">
    <h1>Please Login</h1>
    <div>
      <!--
      <WavyLabelInput
        Type="text"
        Label="Username"
        :Required="true"
        :modelValue="username"
        :validator="isUsernameValid"
        :errorMessage="errorUsername"
      />
      <WavyLabelInput
        Type="password"
        Label="Password"
        :Required="true"
        :modelValue="password"
        :validator="isPasswordValid"
        :errorMessage="errorPassword"
      />
    -->
      <FloatLabel class="input">
        <InputText
          ref="usernameRef"
          @focus="usernameFocus = true"
          @blur="usernameFocus = false"
          v-model="username"
        />
        <label for="username">Username</label>
      </FloatLabel>
      <p class="error-label" v-if="!isUsernameValid">{{ errorUsername }}</p>
      <div class="password-container">
        <div class="pas-column">
          <FloatLabel v-if="showPassword" class="input">
            <InputText
              type="text"
              @focus="passwordFocus = true"
              @blur="passwordFocus = false"
              ref="passwordRef"
              v-model="password"
              @keyup.enter="login"
            />
            <label for="password">Password</label>
          </FloatLabel>
          <FloatLabel v-else class="input">
            <InputText
              type="password"
              @focus="passwordFocus = true"
              @blur="passwordFocus = false"
              ref="passwordRef"
              v-model="password"
              @keyup.enter="login"
            />
            <label for="password">Password</label>
          </FloatLabel>
        </div>
        <div class="pas-column eye">
          <div @click="showPassword = !showPassword" class="eye">
            <font-awesome-icon
              v-if="showPassword"
              icon="fa-regular fa-eye-slash"
            />
            <font-awesome-icon v-else icon="fa-regular fa-eye" />
          </div>
        </div>
      </div>

      <p class="error-label" v-if="!isPasswordValid">{{ errorPassword }}</p>

      <button @click="login" class="btn">
        <div v-if="loading" class="loader"></div>
        <span v-else>Login</span>
      </button>
      <p class="error-label" v-if="isIncorrect">
        Incorrect Password and Username Combination
      </p>
      <p class="text">
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
//import WavyLabelInput from "../components/WavyLabelInput.vue";
import { useQuestionsStore } from "../stores/counter";
import router from "../router/index";
import { setUser } from "../scripts/modes";

let store = useQuestionsStore();
const loading = ref(false);
const username = ref("");
const errorUsername = ref("Username Too Short");
const password = ref("");
const errorPassword = ref("Password is Too short");
const usernameFocus = ref(false);
const passwordFocus = ref(false);
const showPassword = ref(false);
const isIncorrect = ref(false);
const isUsernameValid = computed(() => {
  if (username.value === "") return true;
  if (usernameFocus.value) return true;
  return username.value.length > 3;
});
const isPasswordValid = computed(() => {
  if (password.value.length === 0) return true;
  if (passwordFocus.value) return true;
  return password.value.length > 7;
});
async function login() {
  loading.value = true;
  let details = {
    username: username.value,
    password: password.value
  };
  let res = await store.loginUser(details);
  let result = res.response === 1;
  if (result) {
    setUser(res.user, store);
    router.push({
      name: "home"
    });
  } else {
    isIncorrect.value = !result;
  }
  loading.value = false;
}
</script>

<style scoped>
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
  margin-top: 10px;
}

.btn:focus {
  outline: 0;
}

.btn:active {
  transform: scale(0.98);
}

.text {
  margin-top: 30px;
}
.input {
  margin-top: 15px;
}
.password-container {
  display: flex;
  flex-direction: row;
}
.eye {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0 0 3px;
}
</style>
