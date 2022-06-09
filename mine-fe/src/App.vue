<template>
  <div class="d-flex flex-column container pb-4 pt-2" style="height: 100vh">
    <navbar>
      <template v-slot:logo>
        <span class="fs-4">Mine Car</span>
      </template>
      <template v-slot:primary-menu>
        <li class="nav-item">
          <router-link class="nav-link active" to="/">Home</router-link>
        </li>
        <li class="nav-item" v-if="role == 2">
          <router-link class="nav-link" to="/admin/vehicles">Vehicle</router-link>
        </li>
      </template>
      <template v-slot:secondary-menu>
        <li class="nav-item" v-if="!token">
          <router-link class="nav-link" to="/login">Log In</router-link>
        </li>
        <li class="nav-item" v-if="!token">
          <router-link class="nav-link active" to="/register"
            >Sign Up</router-link
          >
        </li>
        <li class="nav-item dropdown" v-if="token">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="https://dummyimage.com/200x200/9c939c/fff"
              width="30"
              class="rounded-circle"
            />
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li v-if="role == 2">
              <router-link class="dropdown-item" to="/admin/bookings/create">
                Create Booking
              </router-link>
            </li>
            <li v-if="role == 2">
              <router-link class="dropdown-item" to="/admin/vehicles/create">
                Create Vehicle
              </router-link>
            </li>
            <li>
              <hr class="dropdown-divider" />
            </li>
            <li>
              <button class="dropdown-item text-danger" @click="logout">
                Logout
              </button>
            </li>
          </ul>
        </li>
      </template>
    </navbar>

    <main class="flex-shrink-0">
      <router-view />
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";

import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  },
  setup() {
    let store = useStore();
    const token = ref("");

    let role = ref()

    onMounted(() => {
      role.value = JSON.parse(localStorage.getItem("user")).role
      token.value = localStorage.getItem("token");
    });

    const logout = () => {
      store.dispatch("users/logoutUser");
    };

    return {
      token,
      logout,
      role,
    };
  },
}
</script>

<style>
</style>
