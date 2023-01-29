<template>
  <div>
    <h1>Please, sign in to access the shop</h1>
    <form @submit.prevent="onSubmit">
      <div class="input-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="input-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Sign in</button>
    </form>
    <div v-if="message" class="error-message">{{ message }}</div>
  </div>
</template>

<script>
import { authenticationStore } from "@/store/authentication/authentication";
import { defineComponent, ref } from "vue";
import router from "@/router";
export default defineComponent({
  setup() {
    // Variables are created as refs to be reactive to input text changes. The inputs have the v-model property an will sync with this variables
    const email = ref("");
    const password = ref("");
    const message = ref("");
    async function onSubmit() {
      // Checks that both inputs have text
      if (email.value && password.value) {
        try {
          // Tries to authenticate the user sending the email and the password
          await authenticationStore.dispatch("login", {
            email: email.value,
            password: password.value,
          });
          // Returns to main page
          router.push("/");
        } catch (error) {
          // Handle error
          // The error message will only be shown in the website if it has a value
          message.value =
            "The email or password is incorrect, please try again";
        }
      }
    }
    return {
      email,
      password,
      message,
      onSubmit,
    };
  },
});
</script>

<style scoped>
.error-message {
  background-color: orange;
  border-radius: 15px;
  text-align: center;
  padding: 10px;
  font-size: 1.2em;
  color: black;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
}
label {
  font-size: 1.2em;
}
.input-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}
input {
  margin: 0 auto; /* center the input element within the div */
  font-size: 1.2em;
  height: 10px;
  width: 200px;
  padding: 0.5em;
  border-radius: 15px;
}
button {
  font-size: 1.2em;
  height: 40px;
  width: 100px;
  border-radius: 25px;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
form > div {
  margin-bottom: 10px;
}
</style>