import { createStore } from "vuex";
import { authenticationStore } from "./authentication/authentication";
import { productsStore } from "./products/products";

const store = createStore({
  modules: {
    authenticationStore,
    productsStore,
  },
});

export default store;