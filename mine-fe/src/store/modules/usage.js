import axios from "axios";
import router from "../../router";

export default {
  namespaced: true,
  state: {
    usage: {},
  },
  mutations: {
    setUsage(state, usage) {
      state.usage = usage;
    },
  },
  actions: {
    fetchUsage(ctx, payload) {
      axios.get(`/api/usages/${payload.id}`, {
        headers: {
          role: payload.role
        }
      }).then((res) => {
        ctx.commit("setUsage", res.data);
      });
    },
    updateUsage(ctx, payload) {
      axios.post(`/api/usages/${payload.id}`, payload, {
        headers: {
          role: JSON.parse(localStorage.getItem('user')).role
        }
      }).then((res) => {
        router.push("/admin/vehicles")
      });
    },
  },
  getters: {
  },
};
