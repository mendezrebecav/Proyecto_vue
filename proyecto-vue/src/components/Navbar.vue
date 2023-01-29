<template>
  <nav v-if="!isLoginRoute" class="navbar">
    <div class="navbar-left">
      <img src="@/assets/logo.png" alt="icon" class="icon" />
      <h1 class="navbar-title">Fake shop</h1>
    </div>
    <div class="navbar-center">
      <router-link to="/" class="navbar-button">Products</router-link>
      <router-link to="/profile" class="navbar-button">Profile</router-link>
    </div>
    <div class="navbar-right">
      <button class="logout" @click="logout">Logout</button>
    </div>
  </nav>
</template>

<script>
import { useRoute } from "vue-router";
import { authenticationStore } from "@/store/authentication/authentication";
export default {
  computed: {
    // Checks if the user is in the login route, and if so, it doesn't show this component
    isLoginRoute() {
      const route = useRoute();
      return route.path === "/login";
    },
  },
  methods: {
    logout() {
      authenticationStore.dispatch("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.navbar {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: #ffb000;
}
.navbar-left,
.navbar-right {
  display: flex;
  align-items: center;
}
.navbar-center {
  position: absolute;
  top: 50%;
  left: 49%;
  transform: translate(-50%, -50%);
}
.icon {
  width: 32px;
  height: 32px;
  margin-right: 8px;
}
.navbar-title {
  margin: 0;
}
.navbar-button {
  margin-left: 8px;
  text-decoration: none;
  color: black;
}
.logout {
  border-radius: 20px;
  font-size: 20px;
}
@media (max-width: 426px) {
  .navbar-title {
    display: none;
  }
}
</style>