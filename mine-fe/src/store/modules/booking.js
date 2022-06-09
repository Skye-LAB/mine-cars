import axios from "axios";
import router from "../../router";

export default {
  namespaced: true,
  state: {
    bookings: [],
    bookingId: "",
  },
  mutations: {
    setBookings(state, booking) {
      state.bookings = booking;
    },
    setBookingId(state, id) {
      state.bookingId = id;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    fetchBookings(ctx, payload) {
      let user = JSON.parse(localStorage.getItem("user"))
      if (payload.role == 2) {
        axios.get("/api/bookings/", {
          headers: {
            role: payload.role
          }
        }).then((res) => {
          ctx.commit("setBookings", res.data);
        });
      } else if (payload.role == 1) {
        axios.get(`/api/bookings/agree/${user.id}`, {
          headers: {
            role: payload.role
          }
        }).then((res) => {
          ctx.commit("setBookings", res.data);
        });
      } else {
        axios.get(`/api/bookings/emp/${user.id}`, {
          headers: {
            role: payload.role
          }
        }).then((res) => {
          ctx.commit("setBookings", res.data);
        });
      }
    },
    createBooking(ctx, payload) {
      axios.post("/api/bookings/", payload, {
        headers: {
          role: JSON.parse(localStorage.getItem('user')).role
        }
      }).then((res) => {
        router.push("/")
      });
    },
    verifyBooking(ctx, payload) {
      let user = JSON.parse(localStorage.getItem("user"))
      axios.post(`/api/bookings/agree/${user.id}`, payload, {
        headers: {
          role: JSON.parse(localStorage.getItem('user')).role
        }
      }).then((res) => {
        router.push("/")
      });
    },
    returnBooking(ctx, payload) {
      let user = JSON.parse(localStorage.getItem("user"))
      axios.post(`/api/bookings/emp/${user.id}`, payload, {
        headers: {
          role: JSON.parse(localStorage.getItem('user')).role
        }
      }).then((res) => {
        router.push("/")
      });
    }
  },
  getters: {
    currentBooking(state) {
      return state.bookings.find((x) => x.id === state.bookingId);
    },
  },
};
