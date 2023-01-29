import { createStore } from 'vuex';
import axios from 'axios';

interface IAuthenticationState {
  access_token: string;
}

const state: IAuthenticationState = {
  access_token: ''
};

const getters = {
  isLoggedIn: (state: IAuthenticationState) => () => !!state.access_token};

  // Mutations are called from the actions to change the values of the state variables
const mutations = {
  setToken: (state: IAuthenticationState, access_token: string) => {
    state.access_token = access_token;
  }
};

// Actions are called from the views to interact with the store
const actions = {
  // This function tries to authenticate the user by giving the api an email and password
  async login({ commit }, { email, password }: { email: string; password: string }) {
    const { data } = await axios.post('https://api.escuelajs.co/api/v1/auth/login', {
      email,
      password
    });
    commit('setToken', data.access_token);
    localStorage.setItem('access_token', data.access_token);
  },
  // This function removes the token from the state and local storage to logout
  logout({ commit }) {
    commit('setToken', '');
    localStorage.removeItem('access_token');
  },
  // This function retrieves the token from the local storage if there is one
  getToken({ commit }) {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      commit('setToken', access_token);
    }
  }
};

export const authenticationStore = createStore({
  state,
  getters,
  mutations,
  actions
});