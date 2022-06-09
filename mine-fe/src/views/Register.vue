<template>
  <title-content where="center">
    <template v-slot:title>
      <h2>Register</h2>
    </template>
  </title-content>

  <form id="form" @submit.prevent="register">
    <div class="row my-3">
      <div class="col-md-6 col-sm-12 mx-auto">
        <div class="alert alert-danger" v-if="error">
        {{ error }}
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">
            <i class="bi bi-file-person-fill"></i>
          </span>
          <input
            type="Username"
            id="username"
            class="form-control"
            placeholder="Username"
            v-model="username"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">
            <i class="bi bi-envelope-fill"></i>
          </span>
          <input
            type="email"
            id="email"
            class="form-control"
            placeholder="Email"
            v-model="email"
          />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
          <input
            type="password"
            id="password"
            class="form-control"
            placeholder="Password"
            v-model="password"
          />
          <span class="input-group-text"><i class="bi bi-eye-fill"></i></span>
        </div>
        <div class="mt-4">
          <span>
            Already have an account?
            <router-link to="/login">Log In</router-link>
          </span>
        </div>
        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary my-3">Register</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

import TitleContent from "@/components/TitleContent.vue";

export default {
  components: {
    TitleContent,
  },
  setup() {
    let store = useStore();

    const username = ref("");
    const email = ref("");
    const password = ref("");

    const register = () => {
      store.dispatch("users/registerUser", {
        username: username.value,
        email: email.value,
        password: password.value,
      });
    };

    return {
      username,
      email,
      password,
      register,
    };
  },
};
</script>

<style></style>
