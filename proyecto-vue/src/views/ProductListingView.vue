<template>
  <div>
    <SearchBar @search-title="searchTitle" />
    <div class="container">
      <ProductContainer
        v-for="product in products"
        :key="product.id"
        :product="product"
        @click="goToDetail(product.id)"
      />
    </div>
    <div class="pagination"></div>
    <PaginationBar @change-page="changePage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { productsStore } from "@/store/products/products";
import ProductContainer from "@/components/ProductContainer.vue"; // @ is an alias to /src
import SearchBar from "@/components/SearchBar.vue";
import PaginationBar from "@/components/PaginationBar.vue";
import router from "@/router";
export default defineComponent({
  name: "ProductListing",
  components: {
    ProductContainer,
    SearchBar,
    PaginationBar,
  },
  methods: {
    // When the product container is clicked, the router changes to the product detail url with the id of the product as a parameter
    goToDetail(id: number) {
      router.push({ name: "productDetail", params: { id } });
    },
  },
  setup() {
    // Fetches the products from the api
    productsStore.dispatch("fetchProducts");
    // Retrieves the fetched products from the state and saves them in the products variable. The computed function allows the code to wait for the fetch to complete
    let products = computed(() => productsStore.state.products);
    // Pagination
    const offset = ref(0); // I use a ref variable in order for it to be reactive to value changes
    const perPage = 6;
    
    // This function will be executed when the change-page emit happens
    const changePage = (page: number) => {
      offset.value = (page - 1) * perPage;
      // Updates the offset value from the state
      productsStore.dispatch("updateOffset", offset.value);
      productsStore.dispatch("fetchProducts");
    };
    const title = ref("");
    // This function will be executed when the search-title emit happens
    const searchTitle = (newTitle: string) => {
      title.value = newTitle;
      // Updates the title value from the state
      productsStore.dispatch("updateTitle", title.value);
      productsStore.dispatch("fetchProducts");
    };
    return {
      products,
      changePage,
      searchTitle,
    };
  },
});
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
}
@media (max-width: 1025px) {
  .container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>