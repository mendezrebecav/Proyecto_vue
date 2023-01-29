<template>
  <div class="pagination">
    <button @click="previousPage">&lt;</button>
    <button
      v-for="page in pages"
      :key="page"
      @click="goToPage(page)"
      :class="{ selected: currentPage === page }"
    >
      {{ page }}
    </button>
    <button @click="nextPage">&gt;</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    // This function creates an array with 9 elements for the template, which will create 9 buttons
    pages() {
      return Array.from({ length: 9 }, (_, i) => i + 1);
    },
  },
  methods: {
    // This functions allows the user to go the the next, previous or exact page by clicking the buttons and making an emit that the parent view will receive
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.$emit("change-page", this.currentPage);
      }
    },
    nextPage() {
      if (this.currentPage < 9) {
        this.currentPage++;
        this.$emit("change-page", this.currentPage);
      }
    },
    goToPage(page: number) {
      this.currentPage = page;
      this.$emit("change-page", page);
    },
  },
});
</script>

<style scoped>
.selected {
  background-color: #785ef0;
}
.pagination {
  margin: auto;
  margin-bottom: 20px;
  margin-top: 40px;
  padding: 10px;
  background-color: #fe6100;
  border-radius: 25px;
}
button {
  border-radius: 5px;
    font-size: 20px;
}
</style>
