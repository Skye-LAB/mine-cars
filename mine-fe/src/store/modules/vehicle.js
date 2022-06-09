import axios from "axios";
import router from "../../router";

export default {
  namespaced: true,
  state: {
    vehicles: [],
  },
  mutations: {
    setVehicles(state, vehicles) {
      state.vehicles = vehicles;
    },
  },
  actions: {
    fetchVehicles(ctx) {
      axios.get("/api/vehicles/").then((res) => {
        ctx.commit("setVehicles", res.data);
      });
    },
    createVehicle(ctx, payload) {
      axios.post("/api/vehicles/", payload, {
        headers: {
          role: JSON.parse(localStorage.getItem('user')).role
        }
      }).then((res) => {
        router.push("/vehicles")
      });
    },
  },
  getters: {
  },
};
