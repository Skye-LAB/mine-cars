<template>
  <div class="row">
    <title-content where="left">
      <template v-slot:title>
        <h2>Vehicle</h2>
      </template>
    </title-content>
    <div class="card p-2 overflow-auto" style="height: 50vh;">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Plat</th>
            <th scope="col">Jenis</th>
            <th scope="col">Merk</th>
            <th scope="col">BBM</th>
            <th scope="col">Total Jarak</th>
            <th scope="col">Jadwal Service</th>
            <th scope="col">Service Terakhir</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vehicle in vehicles" :key="vehicle.id">
            <th scope="row">1</th>
            <td>{{ vehicle.plat }}</td>
            <td>{{ vehicle.jenis }}</td>
            <td>{{ vehicle.merk }}</td>
            <td>{{ vehicle.usage.bbm }}</td>
            <td>{{ vehicle.usage.jarakTotal }}</td>
            <td>{{ vehicle.usage.serviceHari }}</td>
            <td>{{ vehicle.usage.serviceTerakhir }}</td>
            <td>
              <router-link :to="`/admin/vehicle/usage/edit/${vehicle.usage._id}`">Edit Usage</router-link>
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

import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    TitleContent
  },
  setup() {
    let store = useStore();

    const fetchData = () => {
      store.dispatch("vehicles/fetchVehicles")
    }

    onMounted(() => {
      fetchData()
    })

    return {
      vehicles: computed(() => store.state.vehicles.vehicles)
    };
  }
}
</script>
