<template>
  <div class="profile-container">
    <h1>{{ profile.name }}</h1>
    <img :src="profile.avatar" alt="Avatar" class="avatar" />
    <h2>{{ profile.email }}</h2>
    <h3>Role: {{ profile.role }}</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { authenticationStore } from "@/store/authentication/authentication";
import axios from "axios";
export default defineComponent({
  name: "ProfileView",
  setup() {
    // Gets the access_token from the state
    const accessToken = computed(
      () => authenticationStore.state.access_token
    );
    // Default values in case no data is found
    const profile = ref({
      avatar: "",
      name: "",
      role: "",
      email: "",
    });
    // Makes a get request with axios, passing the access_token as header and receives the user data
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    };
    axios
      .get("https://api.escuelajs.co/api/v1/auth/profile", config)
      .then(({ data }) => {
        profile.value = {
          avatar: data.avatar,
          name: data.name,
          role: data.role,
          email: data.email,
        };
      });
    return {
      profile,
    };
  },
});
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  margin: 50px;
}
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
  border: solid 2px #ccc; /* This adds a solid 2px border around the avatar */
}
h1,
h2,
h3 {
  margin: 0;
}
h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  width: 200px;
  border-bottom: solid 2px #ccc; /* This adds a solid 2px border at the bottom of the h1 */
}
h2 {
  font-size: 1.5rem;
  color: black;
  margin-bottom: 10px;
}
h3 {
  font-size: 1.2rem;
  color: black;
}
</style>