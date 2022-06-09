<template>
  <div class="row">
    <title-content where="left">
      <template v-slot:title>
        <h2>Booking</h2>
      </template>
    </title-content>
    <div class="card p-2 overflow-auto" style="min-height: 50vh;">
      <div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Vehicle</th>
              <th scope="col">Employee</th>
              <th scope="col">Agreing</th>
              <th scope="col">Tanggal Pinjam</th>
              <th scope="col">Tanggal Kembali</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody v-if="booking">
            <tr>
              <td>{{ booking.vehicle.plat }}</td>
              <td>{{ booking.employee.username }}</td>
              <td>{{ booking.agreing.username }}</td>
              <td>{{ booking.tglPinjam }}</td>
              <td>{{ booking.tglKembali }}</td>
              <td>{{ booking.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row">
        <div class="col-md-4">
          <h4>Car Description</h4>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Plat</th>
                <th scope="col">Jenis</th>
                <th scope="col">Merk</th>
              </tr>
            </thead>
            <tbody v-if="booking">
              <tr>
                <td>{{ booking.vehicle.plat }}</td>
                <td>{{ booking.vehicle.jenis }}</td>
                <td>{{ booking.vehicle.merk }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col-md-8">
          <h4>Car Usage</h4>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">BBM</th>
                <th scope="col">Totak Jarak</th>
                <th scope="col">Jadwal Service</th>
                <th scope="col">Service Terakhir</th>
              </tr>
            </thead>
            <tbody v-if="booking">
              <tr>
                <td>{{ booking.vehicle.usage.bbm }}</td>
                <td>{{ booking.vehicle.usage.jarakTotal }}</td>
                <td>{{ booking.vehicle.usage.serviceHari }}</td>
                <td>{{ booking.vehicle.usage.serviceTerakhir }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TitleContent from "@/components/TitleContent.vue";

import { computed, onMounted, watchEffect, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  components: {
    TitleContent
  },
  setup() {
    let store = useStore();
    let route = useRoute();
    let role = ref("");

    role.value = JSON.parse(localStorage.getItem("user")).role

    const fetchData = () => {
      store.dispatch("bookings/fetchBookings", { role: role.value })
    }

    onMounted(() => {
      fetchData();
    });

    watchEffect(() => {
      store.commit("bookings/setBookingId", route.params.id);
    });

    return {
      booking: computed(() => store.getters["bookings/currentBooking"]),
    };
  },
}
</script>
