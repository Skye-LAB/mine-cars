<template>
  <div>
    <title-content where="left">
      <template v-slot:title>
        <h2>Create Booking</h2>
      </template>
    </title-content>
    <div>
      <form @submit.prevent="saveVehicle">
        <div class="row mb-3">
          <div class="col-xl-6">
            <label for="plat" class="form-label">Plat: </label>
            <input class="form-control" type="text" id="plat" v-model="plat"/>
          </div>

          <div class="col-xl-6">
            <label for="jenis" class="form-label">Jenis: </label>
            <select class="form-select" id="jenis" v-model="jenis">
              <option value="1">Orang</option>
              <option value="2">Barang</option>
            </select>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-xl-6">
            <label for="merk" class="form-label">Merk: </label>
            <input class="form-control" type="text" id="merk" v-model="merk"/>
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

    let plat = ref("");
    let jenis = ref("");
    let merk = ref("");

    const saveVehicle = () => {
      store.dispatch("vehicles/createVehicle", {
        plat: plat.value,
        jenis: jenis.value,
        merk: merk.value
      })
    }

    return {
      plat,
      jenis,
      merk,
      saveVehicle
    };
  }
}
</script>
