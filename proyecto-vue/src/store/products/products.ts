import axios from "axios";
import { createStore } from "vuex";

interface IProduct {
  id: number;
  title: string;
  price: number;
  images: [string];
  description: string;
}

interface IProductsState {
  products: IProduct[];
  limit: number;
  offset: number;
  title: string;
}

const state: IProductsState = {
  products: [],
  limit: 6,
  offset: 0,
  title: "",
};

// Mutations are called from the actions to change the values of the state variables
const mutations = {
  setProducts(state: IProductsState, products: IProduct[]) {
    state.products = products;
  },
  setLimit(state: IProductsState, limit: number) {
    state.limit = limit;
  },
  setOffset(state: IProductsState, offset: number) {
    state.offset = offset;
  },
  setTitle(state: IProductsState, title: string) {
    state.title = title;
  },
};

// Actions are called from the views to interact with the store
const actions = {
  // This function gets the product list from the api and filter by title if a title is given.
  async fetchProducts({ commit, state }): Promise<void> {
    try {
      const { data } = await axios.get<IProduct[]>(
        `https://api.escuelajs.co/api/v1/products?limit=${state.limit}&offset=${state.offset}&title=${state.title}`
      );
      commit("setProducts", data);
    } catch (err) {
      console.error(err);
    }
  },
  // This function gets a product by it's ID
  async fetchProductById({ commit, state }, id: number): Promise<IProduct> {
    try {
      const { data }: { data: IProduct } = await axios.get<IProduct>(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  // This function updates the limit value
  async updateLimit({ commit, dispatch }, limit: number): Promise<void> {
    try {
      commit("setLimit", limit);
      await dispatch("fetchProducts");
    } catch (err) {
      console.error(err);
    }
  },
  // This function updates the offset value
  async updateOffset({ commit, dispatch }, offset: number): Promise<void> {
    try {
      commit("setOffset", offset);
      await dispatch("fetchProducts");
    } catch (err) {
      console.error(err);
    }
  },
  // This function updates the title value
  async updateTitle({ commit, dispatch }, title: string): Promise<void> {
    try {
      commit("setTitle", title);
      await dispatch("fetchProducts");
    } catch (err) {
      console.error(err);
    }
  },
};

export const productsStore = createStore({
  state,
  mutations,
  actions,
});
