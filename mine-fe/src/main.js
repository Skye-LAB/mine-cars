import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.headers.common["auth-token"] = localStorage.getItem("token");

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("token") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      let user = JSON.parse(localStorage.getItem("admin"));
      if (to.matched.some((record) => record.meta.is_admin)) {
        if (user) {
          next();
        } else {
          next({ name: "home" });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem("token") == null) {
      next();
    } else {
      next({ name: "home" });
    }
  } else {
    next();
  }
});

createApp(App).use(store).use(router).mount('#app')
