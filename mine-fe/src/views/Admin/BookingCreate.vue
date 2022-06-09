<template>
  <div>
    <title-content where="left">
      <template v-slot:title>
        <h2>Create Booking</h2>
      </template>
    </title-content>
    <div>
      <form @submit.prevent="saveBooking">
        <div class="row mb-3">
          <div class="col-xl-6">
            <label for="employee" class="form-label">Employee: </label>
            <select class="form-select" id="employee" v-model="employee">
              <option :value="emp.id" v-for="emp in emps">{{ emp.username }}</option>
            </select>
          </div>

          <div class="col-xl-6">
            <label for="agreing" class="form-label">Agreing: </label>
            <select class="form-select" id="agreing" v-model="agreing">
              <option :value="agree.id" v-for="agree in agrees">{{ agree.username }}</option>
            </select>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-xl-6">
            <label for="vehicle" class="form-label">Vehicle: </label>
            <select class="form-select" id="vehicle" v-model="vehicle">
              <option :value="vehicle.id" v-for="vehicle in vehicles">{{ vehicle.plat }}</option>
            </select>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-xl-6">
            <label for="tgl-pinjam" class="form-label">Tanggal Pinjam: </label>
            <input class="form-control" type="text" id="tgl-pinjam" v-model="tglPinjam" placeholder="yyyy-mm-dd"/>
          </div>

          <div class="col-xl-6">
            <label for="tgl-kembali" class="form-label">Tanggal Kembali: </label>
            <input class="form-control" type="text" id="tgl-kembali" v-model="tglKembali" placeholder="yyyy-mm-dd" />
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-end my-4">
          <button type="submit" class="btn btn-success">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import TitleContent from "@/components/TitleContent.vue";

import axios from "axios";
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    TitleContent
  },
  setup() {
    let store = useStore();

    let tglPinjam = ref("");
    let tglKembali = ref("");
    let employee = ref("");
    let agreing = ref("");
    let vehicle = ref("");

    const fetchData = () => {
      store.dispatch("users/fetchEmps")
      store.dispatch("users/fetchAgrees")
      store.dispatch("vehicles/fetchVehicles")
    }

    onMounted(() => {
      fetchData()
    })

    const saveBooking = () => {
      store.dispatch("bookings/createBooking", {
        employee: employee.value,
        agreing: agreing.value,
        vehicle: vehicle.value,
        tglPinjam: tglPinjam.value,
        tglKembali: tglKembali.value
      })
    }

    return {
      emps: computed(() => store.state.users.emps),
      agrees: computed(() => store.state.users.agrees),
      vehicles: computed(() => store.state.vehicles.vehicles),
      tglPinjam,
      tglKembali,
      employee,
      agreing,
      vehicle,
      saveBooking
    };
  }
}
</script>
