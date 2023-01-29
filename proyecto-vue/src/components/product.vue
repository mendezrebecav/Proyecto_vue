<template>
  <div class="product-container grow">
    <h3>{{ product.title }}</h3>
    <img :src="product.images[0]" alt="product image" />
    <p>{{ product.description }}</p>
    <div class="price">{{ product.price }}$</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ProductContainer",
  // This component receives the product data as a prop given by it's parent component
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style scoped>
.product-container {
  border: 3px solid black;
  border-radius: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 16px;
  position: relative;
  background-color: rgb(236, 236, 236);
}
.product-container img {
  width: 150px;
  margin: 16px;
  border: 2px solid black;
  border-radius: 5px;
}
.product-container h3,
.product-container p {
  margin: 8px 0;
  font-size: 1rem;
}
.product-container h3 {
  margin-top: 0;
  margin-bottom: 8px;
  width: 100%;
  border-bottom: 1px solid black;
  padding: 5px;
}
.product-container p {
  flex-grow: 1;
  text-align: justify;
  text-justify: inter-word;
  max-width: 50%;
  margin-top: 30px;
}
.product-container .price {
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-weight: bold;
  font-size: 30px;
}
.grow { 
transition: all .2s ease-in-out; 
}
.grow:hover { 
transform: scale(1.05); 
}
@media (max-width: 426px) {
  .product-container p {
    font-size: 15px;
    margin: auto;
    padding: 10px;
  }
  .product-container img {
    margin: auto;
  }
  .product-container .price {
    position: initial;
    padding: 10px;
  }
  .product-container {
    display: inline;
  }
}
</style>