<template>
  <div class="search-bar">
    <form class="search-bar-form" @submit.prevent="onSubmit">
      <input
        type="text"
        placeholder="Search by item name"
        class="search-input"
        v-model="searchbar"
        required
      />
      <button type="submit" class="search-button">
        <img
          src="@/assets/search-icon.png"
          alt="Search icon"
          class="search-icon"
        />
      </button>
    </form>
    <div v-if="message" class="error-message">{{ message }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup(props, { emit }) {
    // This variables are ref in order to be reactive to input text changes
    const searchbar = ref("");
    const message = ref("");
    async function onSubmit() {
      if (searchbar.value.length >= 3) {
        // When the button is pressed, this component will make an emit that will be received from it's parent component
        emit("search-title", searchbar.value);
      } else {
        message.value = "The search text must be at least 3 characters long";
      }
    }
    return {
      searchbar,
      message,
      onSubmit,
    };
  },
});
</script>

<style scoped>
.search-bar{
  display: flex;
  align-items: center;
  padding-left: 16px ;
}
.error-message {
  background-color: orange;
  border-radius: 15px;
  text-align: center;
  padding: 10px;
  font-size: 1.2em;
  color: black;
  margin-left: 50px ;
}
.search-bar-form {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  width: 20%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.search-input {
  width: 300px;
  flex-grow: 1;
  padding: 8px;
  border: none;
  font-size: 16px;
  margin-left: auto;
}
.search-button {
  padding: 8px;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
.search-icon {
  width: 24px;
  height: 24px;
}
</style>