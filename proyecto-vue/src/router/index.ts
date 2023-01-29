import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import ProductListingView from "../views/ProductListingView.vue";
import ProductDetailView from '@/views/ProductDetailView.vue'
import LoginView from "../views/LoginView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "productListing",
    component: ProductListingView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/profile",
    name: "profile",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/ProfileView.vue"),
  },
  {
    path: '/product/:id',
    name: 'productDetail',
    component: ProductDetailView,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;