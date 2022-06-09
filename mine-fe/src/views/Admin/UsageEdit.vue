<template>
  <div>
    <title-content where="left">
      <template v-slot:title>
        <h2>Edit Usage</h2>
      </template>
    </title-content>
    <div>
      <form @submit.prevent="updateUsage">
        <div class="row mb-3">
          <div class="col-xl-6">
            <label for="bbm" class="form-label">BBM: </label>
            <input class="form-control" type="number" id="bbm" v-model="bbm"/>
          </div>

          <div class="col-xl-6">
            <label for="jarakTotal" class="form-label">Total Jarak: </label>
            <input class="form-control" type="number" id="jarakTotal" v-model="jarakTotal"/>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-xl-6">
            <label for="serviceHari" class="form-label">Jadwal Service: </label>
            <input class="form-control" type="text" id="serviceHari" placeholder="yyyy-mm-dd" v-model="serviceHari"/>
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
import { ref, computed, onMounted, watchEffect } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  components: {
    TitleContent
  },
  setup() {
    let store = useStore();
    let route = useRoute();

    let bbm = ref("");
    let jarakTotal = ref("");
    let serviceHari = ref("");
    let serviceTerakhir = ref("");

    let role = ref("");

    role.value = JSON.parse(localStorage.getItem("user")).role

    const updateUsage = () => {
      store.dispatch("usages/updateUsage", {
        id: store.state.usages.usage.id,
        bbm: bbm.value,
        jarakTotal: jarakTotal.value,
        serviceHari: serviceHari.value,
        serviceTerakhir: serviceTerakhir.value
      })
    }

    watchEffect(() => {
      bbm.value = store.state.usages.usage.bbm
      jarakTotal.value = store.state.usages.usage.jarakTotal
      serviceHari.value = store.state.usages.usage.serviceHari
    });

    onMounted(() => {
      store.dispatch("usages/fetchUsage", { id: route.params.id, role: role.value })
      serviceTerakhir.value = store.state.usages.usage.serviceHari
    })

    return {
      bbm,
      jarakTotal,
      serviceHari,
      updateUsage
    };
  }
}
</script>
