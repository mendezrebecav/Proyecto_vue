import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { authenticationStore } from "@/store/authentication/authentication";

const app = createApp(App);
app.use(store);
app.use(router);

// Obtains the user token from local storage
authenticationStore.dispatch("getToken");

// If the user is logged in and tries to access the login page, they will be redirected to the main page. And if they are not logged in, they will be redirected to the logging page no matter what page they access
router.beforeEach((to, from, next) => {
  // Checks if there is a token already saved with the getter from the store
  const isLoggedIn = authenticationStore.getters.isLoggedIn();
  if (to.path === "/login") {
    if (isLoggedIn) {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    if (isLoggedIn) {
      next();
    } else {
      next({ path: "/login" });
    }
  }
});

app.mount("#app");
