import axios from "axios";
import router from "../../router";

export default {
  namespaced: true,
  state: {
    user: {},
    emps: [],
    agrees: [],
    error: "",
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    setEmps(state, emps) {
      state.emps = emps;
    },
    setAgrees(state, agrees) {
      state.agrees = agrees;
    },
  },
  actions: {
    loginUser(ctx, payload) {
      axios
        .post("/api/users/login", {
          email: payload.email,
          password: payload.password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          window.location.replace("/");
        })
        .catch((err) => {
          ctx.commit("setError", err.response.data);
        });
    },
    registerUser(ctx, payload) {
      axios
        .post("/api/users", {
          username: payload.username,
          email: payload.email,
          password: payload.password,
        })
        .then(() => {
          router.push("/login");
        })
        .catch((err) => {
          ctx.commit("setError", err.response.data);
        });
    },
    logoutUser(ctx) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      window.location.replace("/");
    },
    fetchEmps(ctx) {
      axios.get("/api/users/role/0", {
        headers: {
          role: JSON.parse(localStorage.getItem('user')).role
        }
      }).then((res) => {
        ctx.commit("setEmps", res.data);
      });
    },
    fetchAgrees(ctx) {
      axios.get("/api/users/role/1", {
        headers: {
          role: JSON.parse(localStorage.getItem('user')).role
        }
      }).then((res) => {
        ctx.commit("setAgrees", res.data);
      });
    }
  },
  getters: {
  },
};
