<template>
  <div v-if="product">
    <h1>{{ product.title }}</h1>
    <div class="product-detail">
      <div class="product-images-container">
        <carousel :items-to-show="1" :wrapAround="true">
          <slide v-for="image in product.images" :key="image">
            <img :src="image" alt="product image" class="product-image"/>
          </slide>
          <template #addons>
            <navigation />
            <pagination />
          </template>
        </carousel>
      </div>
      <div class="product-description-container">
        <div class="description">{{ product.description }}</div>
        <div class="price-tag">{{ product.price }}$</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { productsStore } from "@/store/products/products";
// Simple carousel library with navigation and pagination
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
export default defineComponent({
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  setup() {
    // Retrieves the id that has been passed through the url
    const route = useRoute();
    const productId = +route.params.id;
    // Default values to prevent errors in case no product is found
    let product = ref({ title: "", images: [], description: "", price: 0 });
    // Gets the data of the product by searching it by id
    productsStore.dispatch("fetchProductById", productId).then((data) => {
      product.value = data;
    });
    return {
      product,
    };
  },
});
</script>

<style scoped>
h1 {
  border-bottom: 1px solid #ccc;
  margin-top: 1%;
  padding-bottom: 20px; 
}
.product-images-container {
  max-width: 50%;
  margin: 0 auto;
  margin-top: 50px;
}
.product-image {
width: 450px;
border-radius: 55px;
}
.description {
  padding: 20px;
  font-size: 20px;
  margin-top: 15 px;
}
.price-tag {
  font-size: 40px;
}
</style>
