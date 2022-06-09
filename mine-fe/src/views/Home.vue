<template>
  <div class="row">
    <title-content where="left">
      <template v-slot:title>
        <h2>Booking</h2>
      </template>
    </title-content>
    <div class="card p-2 overflow-auto" style="min-height: 50vh;">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Vehicle</th>
            <th scope="col">Employee</th>
            <th scope="col">Agreing</th>
            <th scope="col">Tanggal Pinjam</th>
            <th scope="col">Tanggal Kembali</th>
            <th scope="col">Status</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="booking in bookings" :key="booking.id">
            <th scope="row">1</th>
            <td>{{ booking.vehicle.plat }}</td>
            <td>{{ booking.employee.username }}</td>
            <td>{{ booking.agreing.username }}</td>
            <td>{{ booking.tglPinjam }}</td>
            <td>{{ booking.tglKembali }}</td>
            <td>{{ booking.status }}</td>
            <td v-if="role == 2">
              <router-link :to="`/admin/bookings/${booking.id}`">Detail</router-link>
            </td>
            <td v-else-if="role == 1">
              <router-link :to="`/agreing/bookings/${booking.id}`">Detail</router-link>
            </td>
            <td v-else>
              <router-link :to="`/emp/bookings/${booking.id}`">Detail</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TitleContent from "@/components/TitleContent.vue";

import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: 'Home',
  components: {
    TitleContent
  },
  setup() {
    let store = useStore();
    let role = ref()

    role.value = JSON.parse(localStorage.getItem("user")).role

    const fetchData = () => {
      store.dispatch("bookings/fetchBookings", { role: role.value })
    }

    onMounted(() => {
      fetchData()
    })

    return {
      bookings: computed(() => store.state.bookings.bookings),
      role
    };
  }
}
</script>
