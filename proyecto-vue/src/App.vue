<template>
  <div class="app-container">
    <NavBar />
    <router-view />
    <FooterBar>&copy; 2023 Andrea Expósito Santana. Powered by Vue. Designed by BambooholicPanda.</FooterBar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavBar from "@/components/NavBar.vue"; // @ is an alias to /src
import FooterBar from "@/components/FooterBar.vue";
export default defineComponent({
  name: "App",
  components: {
    NavBar,
    FooterBar,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  padding-top: 50px;
  margin-bottom: 5%;
  background-color: #648fff;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
  font-size: 20px;
}
nav a.router-link-exact-active {
  color: #785ef0;
  text-decoration: underline;
}
</style>
